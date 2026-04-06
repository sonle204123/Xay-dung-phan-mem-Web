import axios from 'axios';

// Khởi tạo trạm trung chuyển với Base URL chuẩn
const api = axios.create({
  baseURL: 'https://xay-dung-phan-mem-web-hs0s.onrender.com',
});

// THÊM BỘ LỌC TỰ ĐỘNG GẮN TOKEN VÀO MỌI YÊU CẦU
api.interceptors.request.use(
  (config) => {
    // Lấy token từ bộ nhớ trình duyệt (sẽ được lưu lúc đăng nhập)
    const token = localStorage.getItem('token');
    
    // Nếu có token, tự động gắn vào Header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;