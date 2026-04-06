<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        // Lấy dịch vụ kèm tên danh mục của nó
        return response()->json(Service::with('category')->get(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:category,category_id',
            'name' => 'required|string',
            'min_price' => 'required|numeric'
        ]);
        $service = Service::create($request->all());
        return response()->json(['message' => 'Tạo dịch vụ thành công', 'data' => $service], 201);
    }

    public function show($id)
    {
        $service = Service::with('category')->find($id);
        if (!$service) return response()->json(['message' => 'Không tìm thấy'], 404);
        return response()->json($service, 200);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        if (!$service) return response()->json(['message' => 'Không tìm thấy'], 404);
        
        $service->update($request->all());
        return response()->json(['message' => 'Cập nhật thành công', 'data' => $service], 200);
    }

    public function destroy($id)
    {
        $service = Service::find($id);
        if (!$service) return response()->json(['message' => 'Không tìm thấy'], 404);
        $service->delete();
        return response()->json(['message' => 'Xóa thành công'], 200);
    }
}