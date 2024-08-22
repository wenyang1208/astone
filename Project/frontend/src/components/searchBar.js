import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Toolbar, List, ListItem, Typography, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ProductService } from '../services/ProductService';
import Box from '@mui/material/Box';

// main search bar style
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '40px', // Oval shape
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(2),
  width: '75%',
  border: `2px solid ${alpha(theme.palette.common.black, 0.5)}`,
  paddingLeft: '55px', 
  // Make sure this matches the 'left' position of SearchIconWrapper

}));

// input style
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

// search icon wrapper
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'fixed',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'purple',
  padingLeft: '10px',
  
}));

const CloseIconWrapper = styled('div')(({}) => ({
    colour:'purple',
    fontWeight: 'bold',

}));

// Popular keyword list
const PopularKeywords = styled(List)(({ theme }) => ({
  position: 'absolute',
  top: '70px',
  left: 0,
  right: 0,
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px', // create border
  zIndex: 10,
}));

const SearchBar = ({ handleSearchIconClick }) => { 

  const [searchTerm, setSearchTerm] = useState('');
  const [searchFlag, setSearchFlag] = useState(null);
  const [products, setProducts] = useState(null);
  // New state to track focus
  const [isFocused, setIsFocused] = useState(false); 

    useEffect(() => {
    const productService = new ProductService();

    // Call the getProducts method from ProductService
    productService.getProducts()
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
     }, []);

    useEffect(() => {
    if(searchFlag == true) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
    }
    else if(searchFlag == false) {
      const productService = new ProductService();

      productService.getProducts()
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
    }
    }, [searchFlag]);

    useEffect(() => {
        if(searchFlag == true) {
          const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setProducts(filtered);
        }
        else if(searchFlag == false) {
    
          const productService = new ProductService();
    
          productService.getProducts()
          .then(res => {
            setProducts(res.data);
          })
          .catch(err => {
            console.error('Error fetching products:', err);
          });
        }
      }, [searchFlag]);
    
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    
    const handleSearchFilter = () => {
        setSearchFlag(true);
        console.log('Apply filter with search term:', searchTerm);
    };
    
    const handleClearFilter = () => {
        setSearchTerm('');
        setSearchFlag(false);
    };

    // const handleSearchIconClick = () => {
    //     setIsSearchBarVisible(!isSearchBarVisible);
    //     handleClearFilter();
    // };

    const popularKeywords = [
    'Dress',
    'Sweater',
    'Hotpants',
    'Bags',
  ];

  return (
    <Toolbar 
    sx={{ position: 'relative', 
    flexDirection: 'column' }}>
      
      {/* add box for search bar */}
        <Box
            sx={{
            position: 'absolute',
            top: 70, // Adjust according to  header height
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50%',
            zIndex: 10,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            padding: 2,
            display: 'flex',
            justifyContent: 'center', // Center the Search component horizontally
            alignItems: 'center', // Center the Search component vertically
            }}
            >
            
            {/* Search bar */}
            <Search>
                <IconButton onClick = {handleSearchFilter}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
            </IconButton>
            
            {/* input field */}
            <StyledInputBase
                placeholder="Search..."
                value={searchTerm}
                onChange= {handleSearchChange}
                onFocus={() => setIsFocused(true)} 
                // Set focus state
                onBlur={() => setIsFocused(false)} 
                // Remove focus state
            />

            {/* Show popular keywords */}
            {isFocused && searchTerm === '' && (
            <PopularKeywords>
            <ListItem>
                <Typography variant="subtitle1" 
                sx = 
                {{fontWeight: 'bold' 
                }}>
                Popular Keywords
                </Typography>
            </ListItem>

            {/* map popular keywords, can del if cannot render properly*/}
            {popularKeywords.map((keyword, index) => (
                <ListItem key={index}>
                <Typography variant="body2" 
                sx = 
                {{fontWeight: 'normal',
                  color: 'text.secondary'
                }}>
                {keyword}</Typography>
                </ListItem>
            ))}
            </PopularKeywords>
            )}
            </Search>
            
            {/* close search bar */}
            <IconButton onClick = {handleSearchIconClick}>
                <CloseIconWrapper>
                    <ClearIcon/>
                </CloseIconWrapper>
            </IconButton>
        </Box>
    </Toolbar>
  );
};

export default SearchBar;
