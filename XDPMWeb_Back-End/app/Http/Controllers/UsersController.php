<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function getAll()
    {
        $users = Users::all();
        return response()->json($users);
    }

    public function getById($id)
    {
        $user = Users::find($id);
        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function create(Request $request)
    {
        $user = new Users();
        $user->name = $request->input('name');
        $user->save();

        return response()->json(['message' => 'Đã thêm thành công', 'user' => $user], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Users::find($id);
        if ($user) {
            $user->name = $request->input('name');
            $user->save();
            return response()->json(['message' => 'Đã cập nhật thành công', 'user' => $user]);
        } else {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }
    }

    public function delete($id)
    {
        $user = Users::find($id);
        if ($user) {
            $user->delete();
            return response()->json(['message' => 'Đã xóa thành công']);
        } else {
            return response()->json(['message' => 'Không tìm thấy người dùng'], 404);
        }
    }
}
