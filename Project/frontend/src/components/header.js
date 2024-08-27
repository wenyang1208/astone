import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

function Header() {
  const title = 'Astoné'; // Hardcoded title
  const [userFirstName, setUserFirstName] = useState(''); // State for user's first name
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Hardcoded sections
  const sections = [
    { title: 'Men', url: '/men' },
    { title: 'Women', url: '/women' },
    { title: 'Unisex', url: '/unisex' },
    { title: 'Compare', url: '/compare' },
    { title: 'Support', url: '/support' },
    { title: 'Sell', url: '/sell' },
    { title: 'About', url: '/about' },
  ];

  // Check if userEmail exists in localStorage
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    // Fetch user details if userEmail is available
    if (userEmail) {
      axios.get(`http://localhost:8000/user/${userEmail}/`)
        .then(response => {
          setUserFirstName(response.data.first_name);
          console.log('User details:', response.data);
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
    setUserFirstName(''); // Clear userFirstName on logout
    navigate('/');
    handleClose();
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
        <Typography
          component={Link}
          to="/"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {userEmail ? (
          <>
            <Button
              aria-controls={open ? 'user-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              variant="outlined"
              size="small"
            >
              {userFirstName || 'User'} {/* Fallback to 'User' if firstName is not available */}
            </Button>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            size="small"
          >
            Log In
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.url}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography
              variant="body2"
              sx={{ p: 1, flexShrink: 0 }}
            >
              {section.title}
            </Typography>
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
