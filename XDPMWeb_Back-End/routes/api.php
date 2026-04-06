<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\AppointmentController;


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

// Route::get('/users', [UsersController::class, 'getAll']);
// Route::get('/users/{id}', [UsersController::class, 'getById']);
// Route::post('/users', [UsersController::class, 'create']);
// Route::put('/users/{id}', [UsersController::class, 'update']);
// Route::delete('/users/{id}', [UsersController::class, 'delete']);


Route::post('/register', [AuthController::class, 'register']);//Đăng ký tài khoản mới
Route::post('/login', [AuthController::class, 'login']);//Đăng nhập và nhận token
Route::get('/categories', [CategoryController::class, 'index']);// Lấy danh sách danh mục
Route::get('/services', [ServiceController::class, 'index']);// Lấy danh sách dịch vụ
Route::get('/schedules/available', [ScheduleController::class, 'getAvailableSlots']);// Lấy lịch khám trống

// Nhóm các API BẮT BUỘC PHẢI ĐĂNG NHẬP (có token) mới gọi được
Route::middleware('auth:sanctum')->group(function () {

    // Lấy thông tin user đang đăng nhập
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Đăng xuất
    Route::post('/logout', [AuthController::class, 'logout']);

    // Tính năng Đặt lịch (dành cho Khách hàng)
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/my-appointments', [AppointmentController::class, 'myAppointments']);

    // Quản lý Danh mục & Dịch vụ (dành cho Admin)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Quản lý Khách hàng (Thêm, Sửa)
    Route::apiResource('customers', CustomerController::class);

    // Quản lý Hồ sơ khám bệnh (Tạo lịch sử + chi tiết)
    Route::post('/histories', [HistoryController::class, 'store']);
    Route::get('/histories/{id}', [HistoryController::class, 'show']);


});