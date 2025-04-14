import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';

const loginStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '40px',
    width: '400px',
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
  registerLink: {
    marginTop: '15px',
    color: '#0052cc',
    textDecoration: 'none'
  }
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      localStorage.setItem('token', response.token);
      navigate('/home');
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại.');
    }
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.loginBox}>
        <h2 style={loginStyles.title}>Đăng Nhập</h2>
        {error && <p style={loginStyles.errorMessage}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            style={loginStyles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            style={loginStyles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            style={loginStyles.button}
            onMouseOver={(e) => e.target.style.backgroundColor = '#0747a6'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#0052cc'}
          >
            Đăng Nhập
          </button>
        </form>
        <div style={{marginTop: '15px'}}>
          <a 
            href="/register" 
            style={loginStyles.registerLink}
          >
            Tạo tài khoản mới
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;