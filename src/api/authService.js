import api from './axiosConfig';

const login = async (username, password) => {
  console.log('[authService] Gọi API login với username:', username);
  try {
    const response = await api.post('/auth/login', { username, password });
    console.log('[authService] Kết quả API login:', response.data);
    
    if (response.data.token) {
      console.log('[authService] Lưu token vào localStorage:', response.data.token.substring(0, 20) + '...');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Kiểm tra sau khi lưu
      console.log('[authService] Kiểm tra token sau khi lưu:', localStorage.getItem('token') ? 'Đã lưu' : 'Chưa lưu');
      console.log('[authService] Kiểm tra user sau khi lưu:', localStorage.getItem('user') ? 'Đã lưu' : 'Chưa lưu');
    } else {
      console.warn('[authService] API trả về thiếu token!');
    }
    return response.data;
  } catch (error) {
    console.error('[authService] Lỗi login API:', error.response?.data || error.message);
    throw error;
  }
};

const register = async (userData) => {
  console.log('[authService] Gọi API register với data:', userData);
  try {
    const response = await api.post('/auth/register', userData);
    console.log('[authService] Kết quả API register:', response.data);
    return response.data;
  } catch (error) {
    console.error('[authService] Lỗi register API:', error.response?.data || error.message);
    throw error;
  }
};

const logout = () => {
  console.log('[authService] Logout - xóa token và user từ localStorage');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Kiểm tra sau khi xóa
  console.log('[authService] Kiểm tra sau logout - token:', localStorage.getItem('token') ? 'Còn tồn tại' : 'Đã xóa');
  console.log('[authService] Kiểm tra sau logout - user:', localStorage.getItem('user') ? 'Còn tồn tại' : 'Đã xóa');
};

const getCurrentUser = () => {
  console.log('[authService] getCurrentUser được gọi');
  const userStr = localStorage.getItem('user');
  console.log('[authService] User string từ localStorage:', userStr ? 'Có dữ liệu' : 'Không có dữ liệu');
  
  if (!userStr) {
    console.log('[authService] Không tìm thấy user trong localStorage');
    return null;
  }
  
  try {
    const user = JSON.parse(userStr);
    console.log('[authService] Parse user thành công:', user ? 'Có dữ liệu' : 'Không có dữ liệu');
    return user;
  } catch (err) {
    console.error('[authService] Lỗi khi parse user JSON:', err);
    return null;
  }
};

const test = async () => {
  console.log('[authService] Gọi API test để kiểm tra token');
  try {
    const response = await api.get('/auth/test');
    console.log('[authService] API test thành công:', response.data);
    return response.data;
  } catch (error) {
    console.error('[authService] API test thất bại:', error.response?.data || error.message);
    throw error;
  }
};

const authService = {
  login,
  register,
  logout,
  getCurrentUser,
  test
};

export default authService;