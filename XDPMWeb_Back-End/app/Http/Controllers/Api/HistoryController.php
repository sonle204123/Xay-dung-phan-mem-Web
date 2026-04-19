<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\History;
use App\Models\HistoryDetail;
use App\Models\Invoice; // Thêm Model Invoice
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customer,customer_id',
            'date' => 'required|date',
            'time' => 'nullable',
            'noted' => 'nullable|string',
            'services' => 'required|array|min:1', 
            'services.*.service_id' => 'required|exists:service,service_id',
            'services.*.price' => 'required|numeric|min:0',
            'services.*.quantity' => 'required|integer|min:1'
        ]);

        try {
            // Mở Transaction: Đảm bảo nếu tạo Hóa đơn lỗi thì Bệnh án cũng không được lưu
            DB::beginTransaction();

            // 1. Xác định người thực hiện (Bác sĩ)
            $currentUserId = Auth::id() ?? 1; 

            // 2. Tạo Hồ sơ lịch sử khám (History)
            $history = History::create([
                'customer_id' => $request->customer_id,
                'user_id'     => $currentUserId,
                'date'        => $request->date,
                'time'        => $request->time ?? now()->format('H:i:s'),
                'noted'       => $request->noted,
                'createdBy'   => $currentUserId
            ]);

            $totalPrice = 0;

            // 3. Lặp qua mảng Dịch vụ để lưu vào bảng Chi tiết và cộng dồn tiền
            foreach ($request->services as $service) {
                HistoryDetail::create([
                    'history_id' => $history->history_id,
                    'service_id' => $service['service_id'],
                    'price'      => $service['price'],
                    'quantity'   => $service['quantity']
                ]);

                // Tính tổng tiền cho hóa đơn
                $totalPrice += ($service['price'] * $service['quantity']);
            }

            // 4. TỰ ĐỘNG TẠO HÓA ĐƠN (INVOICE)
            // Lễ tân sẽ dựa vào đây để thu tiền sau khi khám xong
            Invoice::create([
                'user_id'        => $currentUserId,
                'history_id'     => $history->history_id,
                'total_price'    => $totalPrice,
                'method_payment' => 'Chưa xác định',
                'status'         => 'unpaid', // Mặc định là chưa thanh toán
                'createdAt'      => now()
            ]);

            // Hoàn tất lưu data
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Lưu hồ sơ khám và tạo hóa đơn thành công', 
                'data' => [
                    'history_id' => $history->history_id,
                    'total_invoice' => $totalPrice
                ]
            ], 201);

        } catch (\Exception $e) {
            // Có lỗi xảy ra -> Hủy bỏ toàn bộ quá trình lưu để bảo vệ data
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi khi lưu dữ liệu: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        // Lấy lịch sử khám kèm chi tiết, bác sĩ, khách hàng và cả hóa đơn liên quan
        $history = History::with(['details.service', 'user', 'customer', 'invoice'])->find($id);
        
        if (!$history) {
            return response()->json(['message' => 'Không tìm thấy hồ sơ'], 404);
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $history
        ], 200);
    }

    /**
     * 1. GET /api/invoices: Lễ tân lấy danh sách chờ thanh toán
     */
    public function getPendingInvoices()
    {
        try {
            // Lấy các lịch sử khám có trạng thái là 'pending_payment'
            // Giả sử Châu thêm cột 'payment_status' vào bảng histories
            $invoices = \App\Models\History::with(['customer', 'user'])
                ->where('payment_status', 'pending')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $invoices
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * 2. PUT /api/histories/{id}/pay: Xác nhận thanh toán
     */
    public function markAsPaid($id)
    {
        try {
            $history = \App\Models\History::find($id);

            if (!$history) {
                return response()->json(['message' => 'Không tìm thấy hóa đơn'], 404);
            }

            $history->payment_status = 'paid';
            $history->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Xác nhận thanh toán thành công!',
                'data' => $history
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}