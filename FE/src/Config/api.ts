import axios from 'axios';

const api = axios.create({
  baseURL: 'https://xay-dung-phan-mem-web-hs0s.onrender.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Đảm bảo gửi đúng Header Authorization cho Laravel Sanctum
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = 'application/json'; // Thêm dòng này để server ưu tiên trả về JSON
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;