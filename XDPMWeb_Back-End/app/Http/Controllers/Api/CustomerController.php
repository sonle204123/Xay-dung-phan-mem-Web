<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        return response()->json(Customer::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string',
            'contact_number' => 'required|string'
        ]);

        // Lấy thông tin người gửi API (phải có token đăng nhập mới có user())
        $data = $request->all();
        $data['createdBy'] = $request->user() ? $request->user()->user_id : null;

        $customer = Customer::create($data);
        return response()->json(['message' => 'Tạo hồ sơ khách hàng thành công', 'data' => $customer], 201);
    }

    public function show($id)
    {
        $customer = Customer::with('histories')->find($id);
        if (!$customer) return response()->json(['message' => 'Không tìm thấy'], 404);
        return response()->json($customer, 200);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) return response()->json(['message' => 'Không tìm thấy'], 404);
        
        $customer->update($request->all());
        return response()->json(['message' => 'Cập nhật thành công', 'data' => $customer], 200);
    }

    
public function destroy($id)
{
    try {
        $customer = \App\Models\Customer::find($id);

        if (!$customer) {
            return response()->json([
                'status' => 'error',
                'message' => 'Không tìm thấy bệnh nhân này!'
            ], 404);
        }

        // Thực hiện xóa
        $customer->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Đã xóa hồ sơ bệnh nhân thành công!'
        ]);

    } catch (\Exception $e) {
        // Lỗi này thường xảy ra nếu bệnh nhân đã có lịch sử khám (khóa ngoại)
        return response()->json([
            'status' => 'error',
            'message' => 'Không thể xóa vì bệnh nhân này đã có dữ liệu khám bệnh!'
        ], 500);
    }
}
}