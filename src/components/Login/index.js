import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'; // Import Redirect từ react-router-dom
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state để theo dõi trạng thái đăng nhập
  const [isAdmin, setIsAdmin] = useState(false); // Thêm state để theo dõi trạng thái admin

  const handleLogin = (event) => {
    event.preventDefault();

    // Giả định các giá trị username và password để đăng nhập
    const mockUsername = '123';
    const mockPassword = 'p123';
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    // Kiểm tra nếu username và password nhập vào khớp với giả định
    if (username === mockUsername && password === mockPassword) {
      // Xử lý đăng nhập thành công cho người dùng
      setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true
    } else if (username === adminUsername && password === adminPassword) {
      // Xử lý đăng nhập thành công cho admin
      setIsAdmin(true); // Đặt trạng thái admin thành true
    } else {
      // Xử lý đăng nhập thất bại
      setError('Username hoặc mật khẩu không chính xác');
    }
  };

  // Nếu đăng nhập thành công với admin, Redirect đến màn hình admin
  if (isAdmin) {
    return <Redirect to="/admin" />;
  }

  // Nếu đăng nhập thành công, Redirect đến màn hình user
  if (isLoggedIn) {
    return <Redirect to="/user" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.loginBox}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <i className="fas fa-user" style={styles.icon}></i>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <i className="fas fa-lock" style={styles.icon}></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
      'url("https://huce.edu.vn/images57/portal-1/Tin%20t%E1%BB%A9c/Ho%E1%BA%A1t%20%C4%91%E1%BB%99ng%20chung/thive_01.png")',
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  loginBox: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '2em',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    zIndex: 2,
  },
  inputGroup: {
    position: 'relative',
    marginBottom: '1em',
  },
  icon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#aaa',
  },
  input: {
    width: '100%',
    padding: '0.5em 0.5em 0.5em 2.5em',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.7em 1.5em',
    cursor: 'pointer',
    backgroundColor: '#002a5c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1em',
  },
};

export default Login;
