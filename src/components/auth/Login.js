import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api';
import { useAuth } from '../../context/AuthContext';

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
  successMessage: {
    color: 'green',
    marginBottom: '15px'
  },
  registerLink: {
    marginTop: '15px',
    color: '#0052cc',
    textDecoration: 'none'
  },
  loadingMessage: {
    color: 'blue',
    marginBottom: '15px'
  },
  debugBox: {
    marginTop: '20px',
    textAlign: 'left',
    fontSize: '12px',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px'
  },
  continueButton: {
    marginTop: '15px',
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [loginComplete, setLoginComplete] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('[Login] Bắt đầu đăng nhập với username:', username);
    setLoading(true);
    setError('');
    setSuccess('');
    setDebugInfo('Đang đăng nhập...');
    
    try {
      console.log('[Login] Gọi auth.login');
      const response = await authService.login(username, password);
      console.log('[Login] Đăng nhập thành công:', response);
      
      // Lưu token vào localStorage
      if (response.token) {
        console.log('[Login] Lưu token:', response.token.substring(0, 20) + '...');
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
      } else {
        console.error('[Login] Không có token trong response');
        setError('Đăng nhập thành công nhưng không nhận được token');
        setLoading(false);
        return;
      }
      
      // Kiểm tra token
      console.log('[Login] Token sau khi lưu:', localStorage.getItem('token'));
      console.log('[Login] User sau khi lưu:', localStorage.getItem('user'));
      
      setSuccess('Đăng nhập thành công! Token đã được lưu.');
      setDebugInfo(JSON.stringify(response, null, 2));
      setLoginComplete(true);
      setLoading(false);
    } catch (err) {
      console.error('[Login] Lỗi đăng nhập:', err);
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
      setDebugInfo(err.toString());
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate('/home');
  };

  return (
    <div style={loginStyles.container}>
      <div style={loginStyles.loginBox}>
        <h2 style={loginStyles.title}>Đăng Nhập</h2>
        {error && <p style={loginStyles.errorMessage}>{error}</p>}
        {success && <p style={loginStyles.successMessage}>{success}</p>}
        
        {!loginComplete ? (
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              style={loginStyles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              style={loginStyles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button 
              type="submit" 
              style={loginStyles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0747a6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#0052cc'}
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
            </button>
          </form>
        ) : (
          <button 
            style={loginStyles.continueButton}
            onClick={handleContinue}
          >
            Tiếp tục vào trang chủ
          </button>
        )}
        
        {!loginComplete && (
          <div style={{marginTop: '15px'}}>
            <a 
              href="/register" 
              style={loginStyles.registerLink}
            >
              Tạo tài khoản mới
            </a>
          </div>
        )}
        
        {/* Debug info */}
        <div style={loginStyles.debugBox}>
          <p><strong>Debug info:</strong></p>
          <p>Token: {localStorage.getItem('token') ? 'Có token' : 'Không có token'}</p>
          <p>User: {localStorage.getItem('user') ? 'Có user data' : 'Không có user data'}</p>
          {debugInfo && (
            <div>
              <p><strong>Response:</strong></p>
              <pre style={{whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>{debugInfo}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;