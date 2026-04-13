<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    // 1. Khách hàng gửi yêu cầu đặt lịch
    public function store(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required|integer', // Khách chọn khám với bác sĩ nào
            'contact_number' => 'required|string|max:20', // Số điện thoại liên hệ
            'date' => 'required|date',
            'time' => 'required',
            'noted' => 'nullable|string'
        ]);

        // Lấy thông tin tài khoản đang đăng nhập (Khách hàng) từ Token
        $patient = $request->user();

        $appointment = Appointment::create([
            'user_id' => $request->doctor_id, // Lưu ID của bác sĩ được chọn vào cột user_id
            'fullname' => $patient->fullname, // Tự động lấy tên từ tài khoản đăng nhập
            'contact_number' => $request->contact_number, // Lấy từ form khách nhập
            'date' => $request->date,
            'time' => $request->time,
            'noted' => $request->noted,
            'status' => 'pending' // Trạng thái mặc định: Chờ phòng khám xác nhận
        ]);

        return response()->json([
            'message' => 'Đặt lịch thành công, vui lòng chờ phòng khám xác nhận!', 
            'data' => $appointment
        ], 201);
    }

    // 2. Khách hàng xem lại lịch sử các lịch hẹn của chính mình
    public function myAppointments(Request $request)
    {
        // Lấy tài khoản đang đăng nhập
        $patient = $request->user();
        
        // Tìm các lịch hẹn trùng với tên của tài khoản này
        $appointments = Appointment::where('fullname', $patient->fullname)
                                   ->orderBy('date', 'desc')
                                   ->get();

        return response()->json($appointments, 200);
    }
}