<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
   // 1. ĐĂNG KÝ (REGISTER)
    public function register(Request $request)
    {
        // Kiểm tra dữ liệu gửi lên
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'fullname' => 'required|string',
        ]);

        // Tạo user mới (mã hóa mật khẩu)
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password), // Bắt buộc mã hóa mật khẩu
            'fullname' => $request->fullname,
            'role_id' => 2, // Giả sử 2 là role Khách hàng/Bệnh nhân
        ]);

        return response()->json(['message' => 'Đăng ký thành công!'], 201);
    }
}
