import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    // <AppBar position="static" style={{ background: '#002a5c' }}>
    //   <Toolbar>
    <Box
      sx={{
        background: '#002a5c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1" style={{ color: 'white' }}>
        © Bản quyền thuộc về Trường Đại học Xây dựng Hà Nội
      </Typography>
      <Typography variant="body2" style={{ color: 'white' }}>
        Quản lý bởi Phòng Truyền thông và Tuyển sinh
      </Typography>
      <Typography variant="body2" style={{ color: 'white' }}>
        Số điện thoại: (024) 3 869 4711; Hotline: 0869 071 382;
      </Typography>
    </Box>
    //   </Toolbar>
    // </AppBar>
  );
}

export default Footer;
