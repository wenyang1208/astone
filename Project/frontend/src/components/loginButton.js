import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userFirstName, setUserFirstName] = useState('');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details if userEmail is available
    if (userEmail) {
      axios.get(`http://localhost:8000/user/${userEmail}/`)
        .then(response => {
          setUserFirstName(response.data.first_name);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          setUserFirstName('');
        });
    }
  }, [userEmail]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail(null);
    navigate('/'); // Redirect to home after logout
    handleClose(); // Close the menu after logout
  };

  return (
    <>
      {userEmail ? (
        <>
          <Button
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            variant="outlined"
            color="inherit"
            sx={{ ml: 2 }}
          >
            {userFirstName}
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'user-button',
            }}
          >
            <MenuItem component={Link} to="/sell" onClick={handleClose}>Sell</MenuItem>
            <MenuItem component={Link} to="/support" onClick={handleClose}>Support</MenuItem>
            <MenuItem component={Link} to="/settings" onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          color="inherit"
          sx={{ ml: 2 }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default LoginButton;
