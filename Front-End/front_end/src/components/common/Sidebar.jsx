import React, {  } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import {
  GridView,
  AssignmentTurnedIn 
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const SidebarMenu = () => {


  return (
    <Box sx={{ width: 250, p: 2 }}>
      <List disablePadding>
        <NavLink to="/homepage" className={({ isActive }) => 
    isActive 
      ? 'active_link' 
      : 'inactive_link'
  }>
            <ListItem key={"overview"} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
              
                sx={{
                  borderRadius: '12px', 
                 
                  transition: 'all 0.2s ease',
                  py: 1.5,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40, 
                   
                  }}
                >
                 <GridView />
                </ListItemIcon>
                <ListItemText 
                  primary={"Overview"} 
                  primaryTypographyProps={{ 
                    
                    fontSize: '1.05rem'
                  }} 
                />
              </ListItemButton>
            </ListItem>
            </NavLink>
            <NavLink to="/mytasks" className={({ isActive }) => 
    isActive 
      ? 'active_link' 
      : 'inactive_link'
  }>
            <ListItem key={"My tasks"} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
              
                sx={{
                  borderRadius: '12px', 
                 
                  transition: 'all 0.2s ease',
                  py: 1.5,
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40, 
                   
                  }}
                >
                 <AssignmentTurnedIn />
                </ListItemIcon>
                <ListItemText 
                  primary={"My tasks"} 
                  primaryTypographyProps={{ 
                    
                    fontSize: '1.05rem'
                  }} 
                />
              </ListItemButton>
            </ListItem></NavLink>
          
        
      </List>
    </Box>
  );
};

export default SidebarMenu;