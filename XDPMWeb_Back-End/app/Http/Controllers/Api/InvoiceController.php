<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InvoiceController extends Controller
{
    /**
     * 1. GET /api/invoices: Lấy danh sách hóa đơn (Lễ tân dùng)
     */
    public function index()
    {
        try {
            // Lấy hóa đơn kèm thông tin Bác sĩ (user) và Bệnh án (history)
            $invoices = Invoice::with(['user', 'history'])
                ->orderBy('createdAt', 'desc')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $invoices
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 2. PUT /api/invoices/{id}/pay: Xác nhận đã thu tiền
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            // Tìm đúng invoice_id của Châu
            $invoice = Invoice::where('invoice_id', $id)->first();

            if (!$invoice) {
                return response()->json(['message' => 'Hóa đơn không tồn tại'], 404);
            }

            // Cập nhật trạng thái thành Paid
            $invoice->status = 'Paid';
            
            // Nếu Lễ tân chọn phương thức thanh toán (Tiền mặt/Chuyển khoản)
            if ($request->has('method_payment')) {
                $invoice->method_payment = $request->method_payment;
            }

            $invoice->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Đã xác nhận thanh toán thành công!',
                'data' => $invoice
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}