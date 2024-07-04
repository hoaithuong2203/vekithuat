import React, { useState, useEffect } from 'react';

const UserDetail = () => {
  const [userData, setUserData] = useState(null);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [redirectToRegister, setRedirectToRegister] = useState(false); // State để xác định liệu có quay lại màn register hay không

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage khi trang được load
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      // Nếu chưa có dữ liệu từ localStorage, sử dụng dữ liệu mẫu tạm thời
      setUserData({
        fullName: 'Nguyễn Hoài Thương',
        gender: 'Nữ',
        dob: '2002-03-22',
        bornIn: 'Thái Bình',
        cccd: '123456789',
        placeOfIssue: 'Thái Bình',
        email: 'test@gmail.com',
        phoneNumber: '0123456789',
        permanentAddress: '55 Giải Phóng',
        recipientName: 'Nguyễn Hoài Thương',
        recipientPhone: '0987654321',
        parentPhone: '0112233445',
        recipientAddress: 'Thái Bình',
        graduationYear: '2020',
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/auth/login'; // Chuyển hướng về trang đăng nhập khi đăng xuất
  };

  const handleChangePassword = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form
    setShowChangePasswordForm(true);
  };

  const handleCancelChangePassword = () => {
    setShowChangePasswordForm(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleSubmitChangePassword = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    if (newPassword !== confirmNewPassword) {
      alert('Mật khẩu mới và nhập lại mật khẩu mới không khớp.');
      return;
    }

    // Thực hiện logic đổi mật khẩu
    alert('Đổi mật khẩu thành công!');
    setShowChangePasswordForm(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handleEdit = (field) => {
    // Xử lý khi người dùng bấm vào nút "Sửa"
    console.log(`Sửa thông tin ${field}`);
    setRedirectToRegister(true); // Đặt state để chuyển hướng về màn hình đăng ký
  };

  if (redirectToRegister) {
    // Nếu state redirectToRegister là true, thực hiện chuyển hướng (ví dụ: thông qua window.location)
    window.location.href = '/auth/register'; // Thay đổi đường dẫn tới màn hình đăng ký của bạn
    return null; // Chắc chắn bạn không muốn hiển thị gì khác trong trường hợp này
  }

  if (!userData) {
    return <div>Loading...</div>; // Hoặc spinner hoặc tiến trình tải khác
  }

  return (
    <div className="user-detail" style={styles.userDetail}>
      <div className="sidebar" style={styles.sidebar}>
        <h2>Menu</h2>
        <ul>
          <li>
            <button onClick={handleChangePassword}>Đổi mật khẩu</button>
          </li>
          <li>
            <button onClick={handleLogout}>Đăng xuất</button>
          </li>
        </ul>
      </div>
      <div className="content" style={styles.content}>
        {showChangePasswordForm ? (
          <div>
            <h2>Đổi mật khẩu</h2>
            <form onSubmit={handleSubmitChangePassword}>
              <label>
                Mật khẩu hiện tại:
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </label>
              <br />
              <label>
                Mật khẩu mới:
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </label>
              <br />
              <label>
                Nhập lại mật khẩu mới:
                <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Lưu</button>
              <button type="button" onClick={handleCancelChangePassword}>
                Hủy
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2>Thông tin người dùng</h2>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <strong>Họ và tên:</strong>
                  </td>
                  <td>{userData.fullName}</td>
                  <td>
                    <button onClick={() => handleEdit('Họ và tên')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Giới tính:</strong>
                  </td>
                  <td>{userData.gender}</td>
                  <td>
                    <button onClick={() => handleEdit('Giới tính')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Ngày sinh:</strong>
                  </td>
                  <td>{userData.dob}</td>
                  <td>
                    <button onClick={() => handleEdit('Ngày sinh')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Nơi sinh:</strong>
                  </td>
                  <td>{userData.bornIn}</td>
                  <td>
                    <button onClick={() => handleEdit('Nơi sinh')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Số CCCD:</strong>
                  </td>
                  <td>{userData.cccd}</td>
                  <td>
                    <button onClick={() => handleEdit('Số CCCD')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Nơi cấp:</strong>
                  </td>
                  <td>{userData.placeOfIssue}</td>
                  <td>
                    <button onClick={() => handleEdit('Nơi cấp')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{userData.email}</td>
                  <td>
                    <button onClick={() => handleEdit('Email')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại:</strong>
                  </td>
                  <td>{userData.phoneNumber}</td>
                  <td>
                    <button onClick={() => handleEdit('Số điện thoại')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Hộ khẩu thường trú:</strong>
                  </td>
                  <td>{userData.permanentAddress}</td>
                  <td>
                    <button onClick={() => handleEdit('Hộ khẩu thường trú')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Họ và tên người nhận tin:</strong>
                  </td>
                  <td>{userData.recipientName}</td>
                  <td>
                    <button onClick={() => handleEdit('Họ và tên người nhận tin')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại người nhận tin:</strong>
                  </td>
                  <td>{userData.recipientPhone}</td>
                  <td>
                    <button onClick={() => handleEdit('Số điện thoại người nhận tin')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại bố mẹ:</strong>
                  </td>
                  <td>{userData.parentPhone}</td>
                  <td>
                    <button onClick={() => handleEdit('Số điện thoại bố mẹ')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Địa chỉ người nhận tin:</strong>
                  </td>
                  <td>{userData.recipientAddress}</td>
                  <td>
                    <button onClick={() => handleEdit('Địa chỉ người nhận tin')}>Sửa</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Năm tốt nghiệp THPT:</strong>
                  </td>
                  <td>{userData.graduationYear}</td>
                  <td>
                    <button onClick={() => handleEdit('Năm tốt nghiệp THPT')}>Sửa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  userDetail: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  sidebar: {
    width: '200px',
    background: '#f0f0f0',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  },
  content: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
};

export default UserDetail;
