<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/users', [UsersController::class, 'getAll']);
Route::get('/users/{id}', [UsersController::class, 'getById']);
Route::post('/users', [UsersController::class, 'create']);
Route::put('/users/{id}', [UsersController::class, 'update']);
Route::delete('/users/{id}', [UsersController::class, 'delete']);


Route::post('/register', [AuthController::class, 'register']);//Đăng ký tài khoản mới
Route::post('/login', [AuthController::class, 'login']);//Đăng nhập và nhận token



// Nhóm các API BẮT BUỘC PHẢI ĐĂNG NHẬP (có token) mới gọi được
Route::middleware('auth:sanctum')->group(function () {
    
    // Đăng xuất
    Route::post('/logout', [AuthController::class, 'logout']);
});