import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const registerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  },
  registerBox: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '40px',
    width: '450px',
    textAlign: 'center'
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0052cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  errorMessage: {
    color: 'red',
    marginBottom: '15px'
  },
  loginLink: {
    marginTop: '15px',
    color: '#0052cc',
    textDecoration: 'none'
  },
  loadingMessage: {
    color: 'blue',
    marginBottom: '15px'
  }
};

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('[Register] Bắt đầu đăng ký với dữ liệu:', formData);
    setLoading(true);
    setError('');
    setDebugInfo('Đang đăng ký...');
    
    try {
      console.log('[Register] Gọi auth.register');
      const response = await register(formData);
      console.log('[Register] Đăng ký thành công:', response);
      
      setDebugInfo('Đăng ký thành công. Vui lòng đợi...');
      
      // Dừng lại 3 giây trước khi chuyển hướng
      setTimeout(() => {
        console.log('[Register] Chuyển hướng đến /login');
        navigate('/login');
      }, 3000);
    } catch (err) {
      console.error('[Register] Lỗi đăng ký:', err);
      setError('Đăng ký thất bại. Vui lòng thử lại.');
      setDebugInfo('');
      setLoading(false);
    }
  };

  return (
    <div style={registerStyles.container}>
      <div style={registerStyles.registerBox}>
        <h2 style={registerStyles.title}>Đăng Ký Tài Khoản</h2>
        {error && <p style={registerStyles.errorMessage}>{error}</p>}
        {debugInfo && <p style={registerStyles.loadingMessage}>{debugInfo}</p>}
        
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            style={registerStyles.input}
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={registerStyles.input}
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            style={registerStyles.input}
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            style={registerStyles.input}
            value={formData.fullName}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button 
            type="submit" 
            style={registerStyles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0747a6'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0052cc'}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng Ký'}
          </button>
        </form>
        
        <div style={{marginTop: '15px'}}>
          <a 
            href="/login" 
            style={registerStyles.loginLink}
          >
            Đã có tài khoản? Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;