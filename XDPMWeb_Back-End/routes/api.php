<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\HistoryController;
use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\UsersController;
use App\Http\Controllers\Api\InvoiceController;

// --- CÁC API CÔNG KHAI (KHÔNG CẦN TOKEN ĐỂ TEST) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);

// Chuyển các route này ra ngoài để Châu test trên Thunder Client cho dễ
Route::get('/available-slots', [ScheduleController::class, 'getAvailableSlots']);
Route::post('/schedules', [ScheduleController::class, 'store']);
Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);

// Route lưu bệnh án (Đã đưa ra ngoài middleware)
Route::post('/histories', [HistoryController::class, 'store']);
Route::get('/histories/{id}', [HistoryController::class, 'show']);
Route::get('/histories/customer/{id}', [HistoryController::class, 'getByCustomer']);
// API nhân sự 
Route::get('/users', [UsersController::class, 'index']);
Route::post('/users', [UsersController::class, 'store']);
Route::put('/users/{id}', [UsersController::class, 'update']);
Route::delete('/users/{id}', [UsersController::class, 'destroy']);

// Quản lý Lịch làm việc
Route::get('/schedule', [ScheduleController::class, 'index']); // Xem danh sách
Route::post('/schedule', [ScheduleController::class, 'store']); // Phân lịch
Route::delete('/schedule/{id}', [ScheduleController::class, 'destroy']); // Xóa lịch
Route::get('/available-slots', [ScheduleController::class, 'getAvailableSlots']); // Khách xem lịch trống
 // --- API Thanh toán ---
Route::get('/invoice', [InvoiceController::class, 'index']); // xem danh sách hóa đơn
Route::put('/invoice/{id}/pay', [InvoiceController::class, 'updateStatus']); // cập nhật trạng thái thanh toán
// --- NHÓM API BẮT BUỘC ĐĂNG NHẬP ---
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);

    // Tính năng Đặt lịch
    // Lễ tân/Admin sử dụng 
Route::get('/appointments', [AppointmentController::class, 'index']);
Route::put('/appointments/{id}/status', [AppointmentController::class, 'updateStatus']);
Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);

// Khách hàng sử dụng
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::get('/my-appointments', [AppointmentController::class, 'myAppointments']);

    // Quản lý Danh mục & Dịch vụ (Admin)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);
    
    Route::get('/services-with-category', [ServiceController::class, 'GetServicesWithCategory']);


    // Quản lý Khách hàng
    Route::apiResource('customers', CustomerController::class);

   

   
});
