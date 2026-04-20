<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AppointmentController extends Controller
{
    // ============================================================
    // PHẦN DÀNH CHO KHÁCH HÀNG (CUSTOMER)
    // ============================================================

    // 1. Khách hàng gửi yêu cầu đặt lịch
    public function store(Request $request)
    {
        $request->validate([
           'fullname' => 'required|string',
            'doctor_id' => 'required|integer',
            'contact_number' => 'required|string|max:20',
            'date' => 'required|date',
            'time' => 'required',
            'noted' => 'nullable|string'
        ]);

        $patient = $request->user();

        $appointment = Appointment::create([
            'user_id' => $request->doctor_id, 
            'fullname' => $request->fullname, 
            'contact_number' => $request->contact_number, 
            'date' => $request->date,
            'time' => $request->time,
            'noted' => $request->noted,
            'status' => 'pending' 
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Đặt lịch thành công, vui lòng chờ phòng khám xác nhận!', 
            'data' => $appointment
        ], 201);
    }

    // 2. Khách hàng xem lại lịch sử các lịch hẹn của chính mình
    public function myAppointments(Request $request)
    {
        $patient = $request->user();
        
        $appointments = Appointment::where('fullname', $patient->fullname)
                                   ->orderBy('date', 'desc')
                                   ->get();

        return response()->json($appointments, 200);
    }

    // ============================================================
    // PHẦN DÀNH CHO LỄ TÂN & ADMIN (MANAGEMENT)
    // ============================================================

    /**
     * 3. GET /appointments: Lấy TOÀN BỘ lịch hẹn trong hệ thống
     */
    public function index()
    {
        try {
            $appointments = Appointment::orderBy('date', 'desc')->get();

            return response()->json([
                'status' => 'success',
                'data' => $appointments
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 4. PUT /appointments/{id}/status: Cập nhật trạng thái lịch hẹn (Duyệt/Hủy)
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,cancelled,completed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $appointment = Appointment::find($id);

            if (!$appointment) {
                return response()->json(['message' => 'Không tìm thấy lịch hẹn'], 404);
            }

            $appointment->status = $request->status;
            $appointment->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Đã chuyển trạng thái sang: ' . $request->status,
                'data' => $appointment
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * 5. DELETE /appointments/{id}: Xóa lịch hẹn (Dành cho Admin)
     */
    public function destroy($id)
    {
        try {
            $appointment = Appointment::find($id);

            if (!$appointment) {
                return response()->json(['message' => 'Lịch hẹn không tồn tại'], 404);
            }

            $appointment->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Đã xóa lịch hẹn thành công'
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}