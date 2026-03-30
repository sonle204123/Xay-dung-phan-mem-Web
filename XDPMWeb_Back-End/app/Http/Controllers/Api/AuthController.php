<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

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
            'role_id' => 2,
        ]);

        return response()->json(['message' => 'Đăng ký thành công!'], 201);
    }

    // 2. ĐĂNG NHẬP (LOGIN)
    public function login(Request $request)
    {
        // Kiểm tra email và password gửi lên
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Tìm User theo email
        $user = User::where('email', $request->email)->first();

        // Kiểm tra xem User có tồn tại không và mật khẩu có khớp không
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email hoặc mật khẩu không chính xác!'], 401);
        }

        // Tạo Token cho User
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'access_token' => $token,
            'user' => $user
        ], 200);
    }

    // 3. ĐĂNG XUẤT (LOGOUT)
    public function logout(Request $request)
    {
        // Xóa token hiện tại của user đang đăng nhập
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Đã đăng xuất thành công!'], 200);
    }
}
