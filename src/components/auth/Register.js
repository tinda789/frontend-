import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div style={registerStyles.container}>
      <div style={registerStyles.registerBox}>
        <h2 style={registerStyles.title}>Đăng Ký Tài Khoản</h2>
        {error && <p style={registerStyles.errorMessage}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            style={registerStyles.input}
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            style={registerStyles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            style={registerStyles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Họ và tên"
            style={registerStyles.input}
            value={formData.fullName}
            onChange={handleChange}
          />
          <button 
            type="submit" 
            style={registerStyles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0747a6'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0052cc'}
          >
            Đăng Ký
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