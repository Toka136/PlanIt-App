import React, { useState } from 'react';
import { useAuth } from '../../API/Context/AuthContext';
// import x from '../../../../../Back-End/uploads/'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  DarkModeOutlined,
  PersonOutline,
  Logout,
  KeyboardArrowDown,
  AssignmentTurnedIn,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const TaskFlowHeader = () => {
    const navigate=useNavigate();
    const handleLogout=()=>{
      handleCloseMenu();
        Logoutfun();
        navigate("/login");
    }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {user,Logoutfun}=useAuth();
  
  console.log("header user",user)
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    // console.log("user",user.user.userName)
    <AppBar position="static" color="inherit" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Left Side: Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#00a669', // Custom green from your image
              borderRadius: 1.5,
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AssignmentTurnedIn sx={{ color: 'white' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a202c' }}>
            TaskFlow
          </Typography>
        </Box>
        {user?
        <div>
        {/* Right Side: Theme Toggle & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="inherit">
            <DarkModeOutlined />
          </IconButton>
          
          <Box
            onClick={handleOpenMenu}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              ml: 1,
              '&:hover': { opacity: 0.8 },
            }}
          >
            
            <img
            
              src={user?`http://localhost:4000/uploads/${user.avatar}`:"http://localhost:3000/uploads/defualt.webp"} 
              style={{ border: '2px solid #00a669', width: 36, height: 36,borderRadius:"50%",objectFit:"cover" }}
            />
            <KeyboardArrowDown sx={{ color: 'text.secondary', ml: 0.5 }} />
          </Box>
        </Box>

        {/* Dropdown Menu */}
      
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: { mt: 1.5, minWidth: 220, borderRadius: 2 },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
             {user?user.userName:"Guest"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             {user?user.email:"Guest"}
            </Typography>
          </Box>
          
          <Divider />
           
          <MenuItem onClick={()=>{handleCloseMenu();navigate("/profile")}} sx={{ py: 1 }}>
            <ListItemIcon>
              <PersonOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>

          <MenuItem onClick={() => {  handleLogout()}} sx={{ py: 1, color: 'error.main' }}>
            <ListItemIcon>
              <Logout fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
          
          
        </Menu>
        </div>:<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} >
          <IconButton color="inherit">
            <DarkModeOutlined />
          </IconButton>
          <IconButton onClick={()=>{navigate("/login"); handleCloseMenu()}} color="inherit">
            <PersonOutline />
          </IconButton>
        </Box>}

      </Toolbar>
    </AppBar>
  );
};

export default TaskFlowHeader;