import axios from 'axios';

const API_URL = 'http://localhost:8081'; // Thay đổi nếu server của bạn chạy ở port khác

console.log('[axiosConfig] Khởi tạo API với baseURL:', API_URL);

// Tạo instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header của mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('[axios] Request tới:', config.method.toUpperCase(), config.url);
    
    if (token) {
      console.log('[axios] Thêm token vào header:', token.substring(0, 20) + '...');
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('[axios] Không có token trong localStorage');
    }
    return config;
  },
  (error) => {
    console.error('[axios] Lỗi request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => {
    console.log('[axios] Response thành công từ:', response.config.method.toUpperCase(), response.config.url);
    return response;
  },
  (error) => {
    console.error('[axios] Lỗi response từ API:', 
      error.config?.method.toUpperCase(), 
      error.config?.url, 
      error.response?.status, 
      error.response?.data);
    
    // Handle 401 Unauthorized - redirect to login
    if (error.response && error.response.status === 401) {
      console.log('[axios] 401 Unauthorized - Xóa token và chuyển hướng tới login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;