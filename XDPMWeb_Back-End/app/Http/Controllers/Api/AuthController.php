<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // 1. ĐĂNG KÝ (Tự động gán quyền Khách hàng)
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'fullname' => 'required|string',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'fullname' => $request->fullname,
            'role_id' => 4
        ]);

        return response()->json([
            'message' => 'Đăng ký tài khoản Khách hàng thành công!',
            'user' => $user
        ], 201);
    }

    // 2. ĐĂNG NHẬP (Dùng chung cho cả Admin, Bác sĩ và Khách hàng)
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        // Kiểm tra mật khẩu
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email hoặc mật khẩu không đúng'], 401);
        }

        // Tạo Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'access_token' => $token,
            'user' => $user
        ], 200);
    }
}