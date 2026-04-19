<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ScheduleController extends Controller
{
    /**
     * 1. Lấy danh sách lịch trực (Admin xem tất cả, Bác sĩ xem của mình)
     * URL: GET /api/schedules?user_id=2
     */
    public function index(Request $request)
    {
        try {
            $query = Schedule::with(['user', 'scheduleTime']);

            // Nếu truyền user_id lên thì lọc theo bác sĩ đó
            if ($request->has('user_id')) {
                $query->where('user_id', $request->user_id);
            }

            $schedules = $query->orderBy('date', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'data' => $schedules
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * 2. Lấy lịch trống của 1 Bác sĩ (Dành cho Khách hàng đặt lịch)
     * URL: GET /api/available-slots?user_id=2&date=2026-04-19
     */
    public function getAvailableSlots(Request $request)
    {
        $doctorId = $request->query('user_id');
        $date = $request->query('date');

        if (!$doctorId || !$date) {
            return response()->json(['message' => 'Vui lòng cung cấp user_id và date'], 400);
        }

        $schedules = Schedule::with('scheduleTime')
            ->where('user_id', $doctorId)
            ->where('date', $date)
            ->where('status', 'available') 
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $schedules
        ], 200);
    }

    /**
     * 3. Admin phân lịch trực cho Bác sĩ
     * URL: POST /api/schedules
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'date'    => 'required|date|after_or_equal:today',
            'time_ids' => 'required|array', 
            'time_ids.*' => 'exists:schedule_time,schedule_time_id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $createdSchedules = [];

            foreach ($request->time_ids as $timeId) {
                // Kiểm tra xem bác sĩ đã đăng ký khung giờ này vào ngày này chưa
                $exists = Schedule::where('user_id', $request->user_id)
                    ->where('date', $request->date)
                    ->where('schedule_time_id', $timeId)
                    ->exists();

                if (!$exists) {
                    $schedule = Schedule::create([
                        'user_id' => $request->user_id,
                        'schedule_time_id' => $timeId,
                        'date' => $request->date,
                        'status' => 'available',
                        'createdBy' => Auth::id() ?? 1 
                    ]);
                    $createdSchedules[] = $schedule;
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Đã phân lịch làm việc thành công',
                'count' => count($createdSchedules),
                'data' => $createdSchedules
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * 4. Xóa lịch trực (Dành cho Admin/Bác sĩ)
     * URL: DELETE /api/schedules/{id}
     */
    public function destroy($id)
    {
        try {
            $schedule = Schedule::find($id);

            if (!$schedule) {
                return response()->json(['message' => 'Không tìm thấy lịch trực'], 404);
            }

            // Chỉ được xóa nếu khách chưa đặt (status = available)
            if ($schedule->status !== 'available') {
                return response()->json(['message' => 'Lịch này đã có người đặt, không thể xóa'], 400);
            }

            $schedule->delete();
            return response()->json(['status' => 'success', 'message' => 'Đã xóa lịch trực'], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}