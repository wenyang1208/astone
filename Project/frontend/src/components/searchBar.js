import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Typography, { IconButton, Input, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import backgroundImage from '../assets/mask-group-2.png';

// search bar style
const SearchBarWrapper = styled('div')(({ theme }) => ({
    
    // position: 'relative',
    borderRadius: '25px',  // Set high borderRadius for oval shape
    // set height of search bar
    height: '60px',
    width: '70%',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(5, 0, 0, 5),
      marginRight: theme.spacing(2),
      width: '80%',
    },
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // center background img within the search bar
    backgroundPosition: 'center',

}));

// main search bar style
const Search = styled('div')(({ theme }) => ({

    position: 'relative',
    borderRadius: '50px',  // Set high borderRadius for oval shape
    // search bar colour
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // set height of search bar
    // height: '50px',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '100%',
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
// need to change in the further to make it more dyamic
function SearchBar () {

    return (

        <Toolbar>
            <Search>

            <SearchIconWrapper>
                <SearchIcon /> 
                <IconButton/>
            </SearchIconWrapper>

            <StyledInputBase
              placeholder="Search by name.…"
              // arial-label: accessible label for screen readers
              inputProps={{ 'arial-label': 'search'}}
               
            />

        </Search>
        </Toolbar>

        );
        
    }

    export default SearchBar;

  