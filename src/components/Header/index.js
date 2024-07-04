import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#002a5c' }}>
        <Toolbar>
          <img src="/logo_trans.png" alt="Logo" style={{ marginRight: '10px', height: '40px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HỆ THỐNG TỔ CHỨC THI VẼ MỸ THUẬT TRƯỜNG ĐẠI HỌC XÂY DỰNG HÀ NỘI
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
