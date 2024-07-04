import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
  return (
    <div style={styles.container}>
      <div style={styles.buttonsContainer}>
        <Link to="/auth/register" style={styles.buttonLink}>
          <button style={styles.button}>Register</button>
        </Link>
        <Link to="/auth/login" style={styles.buttonLink}>
          <button style={styles.button}>Login</button>
        </Link>
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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'center', // Sắp xếp các nút ở giữa
  },
  buttonLink: {
    textDecoration: 'none', // Loại bỏ đường gạch chân của liên kết
    margin: '0 5px', // Khoảng cách giữa các nút
  },
  button: {
    padding: '0.7em 1.5em',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: '15px',
    borderRadius: '4px',
    fontSize: '1em',
  },
  longButton: {
    width: '150px', // Đặt độ rộng mong muốn cho nút
  },
};

export default Home;
