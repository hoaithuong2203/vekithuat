import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Nếu bạn sử dụng React Router
import './UserInfo.css';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await axios.get('http://localhost:8000/api/v1/user/my-self', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('Response data:', response.data);

        if (response.data) {
          setUserInfo(response.data); // Cập nhật trạng thái userInfo
        } else {
          console.error('Error fetching users:', response.data.EM);
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Server error:', error.response);
          setError(
            new Error(
              `Error ${error.response.status}: ${error.response.data.message || error.response.statusText}`,
            ),
          );
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Network error:', error.request);
          setError(new Error('Network error: No response received from server.'));
        } else {
          // Something happened in setting up the request
          console.error('Error:', error.message);
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    // Xóa access token từ localStorage
    window.localStorage.removeItem('accessToken');
    // Điều hướng người dùng đến trang đăng nhập
    window.location.href = '/auth/login'; // Điều hướng đến đường dẫn của trang đăng nhập
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="user-info-container">
      <h3 style={{ textAlign: 'center' }}>Thông tin bạn đã đăng kí</h3>
      {userInfo && (
        <>
          <table className="user-info-table">
            <tbody>
              <tr>
                <td>Họ và tên:</td>
                <td>{userInfo.fullName}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <td>Giới tính:</td>
                <td>{userInfo.gender === 1 ? 'Nữ' : 'Nam'}</td>
              </tr>
              <tr>
                <td>Ngày sinh:</td>
                <td>{userInfo.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Nơi sinh:</td>
                <td>{userInfo.birthPlace}</td>
              </tr>
              <tr>
                <td>Số CCCD:</td>
                <td>{userInfo.identifyNo}</td>
              </tr>
              <tr>
                <td>Ngày cấp CCCD:</td>
                <td>{userInfo.issueDate}</td>
              </tr>
              <tr>
                <td>Nơi cấp:</td>
                <td>{userInfo.issuePlace}</td>
              </tr>
              <tr>
                <td>Số điện thoại:</td>
                <td>{userInfo.phoneNumber}</td>
              </tr>
              <tr>
                <td>Hộ khẩu thường trú:</td>
                <td>{userInfo.placeOfPermanent}</td>
              </tr>
              <tr>
                <td>Họ và tên người nhận:</td>
                <td>{userInfo.receiverName}</td>
              </tr>
              <tr>
                <td>Số điện thoại bố/mẹ:</td>
                <td>{userInfo.parentPhone}</td>
              </tr>
              <tr>
                <td>Địa chỉ người nhận tin:</td>
                <td>{userInfo.receiverAddress}</td>
              </tr>
              <tr>
                <td>Số điện thoại người nhận tin:</td>
                <td>{userInfo.receiverPhone}</td>
              </tr>
              <tr>
                <td>Năm tốt nghiệp:</td>
                <td>{userInfo.graduationYear}</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container">
            <Link to="/updateuser">
              <button className="edit-button">Chỉnh sửa thông tin</button>
            </Link>
            <button className="edit-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
