import React, {useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { IconButton, Toolbar, Autocomplete} from '@mui/material';
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

  // input style
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

const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
    color: 'purple'// Change the color here
}));

// mock data
// hardcode to display, need to be changed
const suggestions = [
    'Men',
    'Women',
    'Unisex' ,
    'Support',
    'Sell',
    'About',
  ];



// simple search bar
// need to change in the further to make it more dyamic
function SearchBar () {

    const [inputValue, setInput] = useState("");
    
    // need to fectch data from database
    // current is mock data from api
    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((json) => {
            const results = json.filter((user) =>{
                // check mock user exist
                return (
                    value &&
                    user && 
                    user.name && 
                    user.name.toLowerCase().includes(value)
                );
            });
            console.log(results);
            });
    }

    // Handle input change
     const handleInputChange = (value) => {
        setInput(value);
        // fetchData(value);
    }

    // need to change
    let dataSearch = suggestions.filter((item) => {
        return item.toLowerCase().includes(inputValue.toLowerCase());
    });

    return (

        <Toolbar>
             {/* search bar*/}
            <Search>
                {/* Decorate search icon */}
                <SearchIconWrapper>
                    <StyledSearchIcon /> 
                </SearchIconWrapper>

                {/* <Autocomplete
                    freeSolo
                    options={filteredSuggestions}
                    renderInput={(params) => (
                        <StyledInputBase
                            {...params}
                            placeholder="Search by name.…"
                            inputProps = {{ ...params.inputProps, 'aria-label': 'search' }}
                            value = {inputValue}
                            onChange = {(e) => handleInputChange(e.target.value)}
                        />
                    )}
                /> */}

                {/*Decorate search input*/}
                <StyledInputBase
                    placeholder="Search by name.…"
                    // aria-label: accessible label for screen readers
                    inputProps={{ 'aria-label': 'search'}}
                    /* obtain input value */
                    value = {inputValue}
                    onChange = {(e) => handleInputChange(e.target.value)}
                />

            </Search>
        </Toolbar>

        );
    };

    export default SearchBar;

  