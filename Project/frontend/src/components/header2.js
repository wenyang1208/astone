import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';

function Header2() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            component="div"
            variant="h5"
            color="black"
            align="center"
            noWrap
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            Astone
          </Typography>
        </Link>
        <div></div> {/* Placeholder for spacing, you can remove this line if unnecessary */}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header2;
