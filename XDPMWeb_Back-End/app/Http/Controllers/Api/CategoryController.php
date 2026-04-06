<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        // Lấy danh sách danh mục, kèm theo các dịch vụ thuộc danh mục đó
        return response()->json(Category::with('services')->get(), 200);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string']);
        $category = Category::create($request->all());
        return response()->json(['message' => 'Tạo danh mục thành công', 'data' => $category], 201);
    }

    public function show($id)
    {
        $category = Category::with('services')->find($id);
        if (!$category) return response()->json(['message' => 'Không tìm thấy'], 404);
        return response()->json($category, 200);
    }

    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) return response()->json(['message' => 'Không tìm thấy'], 404);
        
        $category->update($request->all());
        return response()->json(['message' => 'Cập nhật thành công', 'data' => $category], 200);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) return response()->json(['message' => 'Không tìm thấy'], 404);
        $category->delete();
        return response()->json(['message' => 'Xóa thành công'], 200);
    }
}