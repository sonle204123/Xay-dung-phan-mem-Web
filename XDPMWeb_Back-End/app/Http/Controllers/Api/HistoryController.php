<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Models\HistoryDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HistoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customer,customer_id',
            'date' => 'required|date',
            'services' => 'required|array', // Mảng các dịch vụ đã làm
            'services.*.service_id' => 'required|exists:service,service_id',
            'services.*.price' => 'required|numeric',
            'services.*.quantity' => 'required|integer'
        ]);

        try {
            // Mở Transaction: An toàn tuyệt đối cho Database
            DB::beginTransaction();

            // 1. Tạo Hồ sơ lịch sử khám (History)
            $historyData = $request->only(['customer_id', 'date', 'time', 'noted']);
            $historyData['user_id'] = $request->user() ? $request->user()->user_id : 1; // Bác sĩ đang khám
            $historyData['createdBy'] = $historyData['user_id'];
            
            $history = History::create($historyData);

            // 2. Lặp qua mảng Dịch vụ để lưu vào bảng Chi tiết (History_Detail)
            foreach ($request->services as $service) {
                HistoryDetail::create([
                    'history_id' => $history->history_id,
                    'service_id' => $service['service_id'],
                    'price' => $service['price'],
                    'quantity' => $service['quantity']
                ]);
            }

            // Hoàn tất lưu data
            DB::commit();

            return response()->json([
                'message' => 'Lưu hồ sơ khám bệnh và chi tiết thành công', 
                'history_id' => $history->history_id
            ], 201);

        } catch (\Exception $e) {
            // Có lỗi xảy ra -> Hủy bỏ toàn bộ quá trình lưu để bảo vệ data
            DB::rollBack();
            return response()->json(['message' => 'Lỗi khi lưu dữ liệu: ' . $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        // Lấy lịch sử khám, kèm theo chi tiết dịch vụ và thông tin bác sĩ khám
        $history = History::with(['details.service', 'user', 'customer'])->find($id);
        if (!$history) return response()->json(['message' => 'Không tìm thấy'], 404);
        return response()->json($history, 200);
    }
}