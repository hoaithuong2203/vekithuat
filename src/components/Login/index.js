import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { postLogin } from '../../services/apiService';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // const handleLogin = async () => {
  //   let data = await postLogin(username, password);
  //   console.log('>>> check data:', data);
  // };

  // if (data.isAdmin) {
  //   setIsAdmin(true)
  //   return <Redirect to="/admin" />;
  // }

  // if (data.isLoggedIn) {
  //   setIsLoggedIn(true)
  //   return <Redirect to="/user" />;
  // }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const req = [];
      let response = await postLogin({ username, password }); // Gọi API để đăng nhập
      console.log(response.data.accessToken);
      console.log(response.data.role.includes('ROLE_ADMIN'));
      if (response?.data?.accessToken) {
        window.localStorage.setItem('accessToken', response?.data?.accessToken);
      }
      if (response.data.role && response.data.role.includes('ROLE_ADMIN')) {
        setIsAdmin(true);
      }
      setIsLoggedIn(true);
    } catch (error) {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };
  if (isAdmin) {
    return <Redirect to="/admin" />;
  }

  if (isLoggedIn) {
    return <Redirect to="/user" />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.loginBox}>
        <h2>ĐĂNG NHẬP</h2>
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
            Đăng nhập
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
