import React, { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Admin.css'; // Import CSS file

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      selectedUser: null,
      users: [],
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/admin/all-users',
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
          },
        },
      );
      if (response.data) {
        // Add index to each user
        const usersWithIndex = response.data.content.map((user, index) => ({
          ...user,
          stt: index + 1,
        }));
        this.setState({ users: usersWithIndex });
      } else {
        console.error('Error fetching users:', response.data.EM);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  handleViewDetail = async (id) => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }
      const req = new FormData();
      req.append('userId', id);
      const response = await axios.post(`http://localhost:8000/api/v1/admin/self-user`, req, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data) {
        this.setState({ selectedUser: response.data, openDialog: true });
      } else {
        console.error('Error fetching user detail:', response.data.EM);
      }
    } catch (error) {
      console.error('Error fetching user detail:', error);
    }
  };

  handleDeleteUser = async () => {
    const { selectedUser, users } = this.state;

    try {
      const req = new FormData();
      req.append('userId', selectedUser.id);
      const response = await axios.post(`http://localhost:8000/api/v1/admin/delete-user`, req, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        },
      });

      if (response.data.success) {
        alert('Đã xóa thành công!');
        const newUsers = users.filter((user) => user.id !== selectedUser.id);
        this.setState({
          openDialog: false,
          selectedUser: null,
          users: newUsers,
        });
      } else {
        console.error('Error deleting user:', response.data.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  handleExportClick = async () => {
    try {
      console.log('Đang export danh sách...');
      const accessToken = window.localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.get('http://localhost:8000/api/v1/admin/download-file', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users_list.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Export thành công:', response.data);
    } catch (error) {
      console.error('Lỗi khi export danh sách:', error);
    }
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleLogout = () => {
    window.localStorage.removeItem('accessToken');
    this.props.history.push('/auth/login'); // Assuming you have a route for the login screen
  };
  handlePageChange = (params) => {
    this.setState({ page: params.page });
  };

  render() {
    const { users, page, pageSize } = this.state;
    const columns = [
      { field: 'stt', headerName: 'STT', width: 70 },
      { field: 'fullName', headerName: 'Họ và tên', width: 150 },
      {
        field: 'gender',
        headerName: 'Giới tính',
        width: 120,
        valueFormatter: (params) => (params.value === 1 ? 'Nữ' : 'Nam'),
      },
      { field: 'dateOfBirth', headerName: 'Ngày/tháng/năm sinh', width: 180 },
      { field: 'identifyNo', headerName: 'Số CCCD', width: 150 },
      {
        field: 'actions',
        headerName: 'Thao tác',
        width: 150,
        renderCell: (params) => (
          <>
            <Button onClick={() => this.handleViewDetail(params.row.id)}>Xem chi tiết</Button>
          </>
        ),
      },
    ];

    return (
      <div className="tableContainer">
        <div style={{ alignSelf: 'flex-start', marginBottom: '10px' }}></div>
        <div
          style={{
            alignSelf: 'flex-end',
            marginBottom: '10px',
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" color="primary" onClick={this.handleExportClick}>
            Export danh sách
          </Button>
          <Button variant="contained" color="secondary" onClick={this.handleLogout}>
            Đăng xuất
          </Button>
        </div>
        <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle style={{ textAlign: 'center' }}>Thông tin chi tiết thí sinh </DialogTitle>
          <DialogContent>
            {this.state.selectedUser && (
              <table style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>
                      <strong>Họ và tên:</strong>
                    </td>
                    <td>{this.state.selectedUser.fullName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Giới tính:</strong>
                    </td>
                    <td>{this.state.selectedUser.gender === 1 ? 'Nữ' : 'Nam'}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Ngày sinh:</strong>
                    </td>
                    <td>{this.state.selectedUser.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Số CCCD:</strong>
                    </td>
                    <td>{this.state.selectedUser.identifyNo}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nơi cấp CCCD:</strong>
                    </td>
                    <td>{this.state.selectedUser.issuePlace}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{this.state.selectedUser.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Nơi sinh:</strong>
                    </td>
                    <td>{this.state.selectedUser.birthPlace}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Số điện thoại:</strong>
                    </td>
                    <td>{this.state.selectedUser.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Hộ khẩu thường trú:</strong>
                    </td>
                    <td>{this.state.selectedUser.placeOfPermanent}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Số điện thoại bố/mẹ:</strong>
                    </td>
                    <td>{this.state.selectedUser.parentPhone}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Địa chỉ người nhận :</strong>
                    </td>
                    <td>{this.state.selectedUser.receiverAddress}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Năm tốt nghiệp THPT:</strong>
                    </td>
                    <td>{this.state.selectedUser.graduationYear}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'right' }}>
                      <Button variant="contained" color="secondary" onClick={this.handleDeleteUser}>
                        Xóa
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </DialogContent>
        </Dialog>

        <DataGrid
          rows={users}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={this.handlePageChange}
          pagination
          autoHeight
        />
      </div>
    );
  }
}

export default withRouter(DataTable);
