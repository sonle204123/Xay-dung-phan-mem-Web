<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    // API Lấy lịch trống của 1 Bác sĩ trong 1 ngày cụ thể
    public function getAvailableSlots(Request $request)
    {
        $doctorId = $request->query('user_id'); // ID của bác sĩ
        $date = $request->query('date'); // Ngày (YYYY-MM-DD)

        if (!$doctorId || !$date) {
            return response()->json(['message' => 'Vui lòng cung cấp user_id (bác sĩ) và date'], 400);
        }

        // Lấy các ca làm việc có status trống 
        $schedules = Schedule::with('scheduleTime') // Nối với bảng schedule_time để lấy giờ
            ->where('user_id', $doctorId)
            ->where('date', $date)
            ->where('status', 'available') 
            ->get();

        return response()->json($schedules, 200);
    }

}