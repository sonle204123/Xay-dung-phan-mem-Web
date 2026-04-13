<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * 1. GET /users: Lấy danh sách toàn bộ nhân viên
     */
    public function index()
    {
        $users = User::orderBy('user_id', 'desc')->get();
        return response()->json([
            'status' => 'success',
            'data' => $users
        ], 200);
    }

    /**
     * 2. POST /users: Admin tạo tài khoản cho nhân viên
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'role_id'  => 'required|in:2,3', // 2: Bác sĩ, 3: Lễ tân
            'phone'    => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'fullname' => $request->fullname,
            'email'    => $request->email,
            'password' => Hash::make($request->password), // Mã hóa mật khẩu
            'role_id'  => $request->role_id,
            'phone'    => $request->phone,
            'status'   => 'active',
            'createdAt' => now()
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Tạo tài khoản nhân viên thành công',
            'data' => $user
        ], 201);
    }

    /**
     * 3. PUT /users/{id}: Cập nhật thông tin nhân viên
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }

        $validator = Validator::make($request->all(), [
            'fullname' => 'sometimes|string|max:255',
            'email'    => 'sometimes|email|unique:users,email,'.$id.',user_id',
            'role_id'  => 'sometimes|in:2,3',
            'password' => 'nullable|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $data = $request->only(['fullname', 'email', 'role_id', 'phone', 'status']);
        
        // Nếu có nhập mật khẩu mới thì mới cập nhật
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Cập nhật thông tin thành công',
            'data' => $user
        ], 200);
    }

    /**
     * 4. DELETE /users/{id}: Xóa tài khoản
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }

        // Thay vì xóa vĩnh viễn, bạn có thể đổi status thành 'inactive' nếu muốn
        $user->delete(); 

        return response()->json([
            'status' => 'success',
            'message' => 'Đã xóa tài khoản nhân viên'
        ], 200);
    }
}