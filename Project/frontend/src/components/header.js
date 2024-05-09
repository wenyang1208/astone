import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  const title = 'Astone'; // Hardcoded title

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
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
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