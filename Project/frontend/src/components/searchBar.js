import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Typography, { Input, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import backgroundImage from '../assests/mask-group-2.png';

// search bar style
// const SearchStyleBar = styled('div')(({ theme }) => ({
    
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center',

// }));

// main search bar style
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  // search input style
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

// search icon wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));


// simple search bar
function SearchBar () {

    return (
        // <SearchStyleBar
        <Toolbar>
            <Search>

            <SearchIconWrapper>
                <SearchIcon />   
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search by name.…"
              inputProps={{ 'arial-label': 'search'}}
               
            />

        </Search>
        </Toolbar>
        // </SearchStyleBar>

        );
        
    }

    export default SearchBar;

  