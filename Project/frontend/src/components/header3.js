import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from './searchBar';
import { useState } from 'react';
import Box from '@mui/material/Box';

function Header3() {
  const title = 'Astoné'; // Hardcoded title

  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // State to manage SearchBar visibility

   // Handler to toggle the SearchBar visibility
   const handleSearchIconClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  // Hardcoded sections
  const sections = [
    { title: 'Men', url: '/men' },
    { title: 'Women', url: '/women' },
    { title: 'Unisex', url: '/unisex' },
    { title: 'Support', url: '/support' },
    { title: 'Sell', url: '/sell' },
    { title: 'About', url: '/about' },
  ];

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
        <IconButton onClick = {handleSearchIconClick}>
          <SearchIcon />
         </IconButton>
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          size="small"
        >
          Log In
        </Button>
      </Toolbar>

      {/* Background overlay when search bar is visible */}
      {isSearchBarVisible && (
        <Box
        sx={{
          size: "50%",
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)', // Semi-transparent background
          zIndex: 9,
        }}
        >
          <SearchBar handleSearchIconClick={handleSearchIconClick} />
        </Box>
      )}

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

export default Header3;