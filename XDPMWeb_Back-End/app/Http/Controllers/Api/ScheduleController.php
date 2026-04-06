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
     * 1. API Lấy lịch trống của 1 Bác sĩ trong 1 ngày cụ thể (Dành cho Khách hàng)
     * URL: GET /api/available-slots?user_id=2&date=2026-04-10
     */
    public function getAvailableSlots(Request $request)
    {
        $doctorId = $request->query('user_id');
        $date = $request->query('date');

        if (!$doctorId || !$date) {
            return response()->json(['message' => 'Vui lòng cung cấp user_id (bác sĩ) và date'], 400);
        }

        $schedules = Schedule::with('scheduleTime')
            ->where('user_id', $doctorId)
            ->where('date', $date)
            ->where('status', 'available') // Phải khớp với dữ liệu 'available' trong DB
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $schedules
        ], 200);
    }

    /**
     * 2. API Đăng ký lịch trực (Dành cho Admin hoặc Bác sĩ tự đăng ký)
     * URL: POST /api/schedules
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
            'date'    => 'required|date|after_or_equal:today',
            'time_ids' => 'required|array', // Gửi lên mảng ID các khung giờ [1, 2, 3...]
            'time_ids.*' => 'exists:schedule_time,schedule_time_id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $createdSchedules = [];

        foreach ($request->time_ids as $timeId) {
            // Kiểm tra trùng lặp trước khi chèn để tránh bác sĩ đăng ký 1 giờ 2 lần
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
                    'createdBy' => Auth::id() ?? 1 // Lấy ID người đang login, mặc định 1 nếu chưa có auth
                ]);
                $createdSchedules[] = $schedule;
            }
        }

        return response()->json([
            'message' => 'Đăng ký lịch làm việc thành công',
            'count' => count($createdSchedules),
            'data' => $createdSchedules
        ], 201);
    }

    /**
     * 3. API Hủy lịch trực (Dành cho Admin/Bác sĩ muốn nghỉ ca đó)
     * URL: DELETE /api/schedules/{id}
     */
    public function destroy($id)
    {
        $schedule = Schedule::find($id);

        if (!$schedule) {
            return response()->json(['message' => 'Không tìm thấy lịch trực'], 404);
        }

        // Chỉ cho phép xóa nếu chưa có ai đặt (status vẫn là available)
        if ($schedule->status !== 'available') {
            return response()->json(['message' => 'Không thể xóa lịch đã có khách đặt hoặc đã hoàn thành'], 400);
        }

        $schedule->delete();
        return response()->json(['message' => 'Đã xóa lịch trực thành công'], 200);
    }
}