import React, {useState, useEffect} from 'react';
import SearchBar from '../components/searchBar';
import { Typography, Select, MenuItem, InputLabel, FormControl,  Box} from '@mui/material';
import MyAppBar from '../components/appBar';
import ProductService from '../services/productService';


  // add backend base url
  const BASE_URL = 'http://localhost:8000';

const Unisex = () => {

  // add backend stuff
  const [product, setProducts] = useState([]);

  // for sorting
  const [sortOption, setSortOption] = useState('price-asc');

  // handle dropdown change 
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    handleSortItems(e.target.value);
  };

  // need to change the logic to fetch the backend products data
  const handleSortItems = (option) => {
    // Add sorting logic here if needed
    console.log('Sorting by:', sortOption);

    const sortedItems = new ProductService().getProducts();

    switch (option) {
      case 'price-asc':
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case 'date-asc':
        sortedItems.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sortedItems.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        console.log('Invalid sort option');
        break;
    
    }
  };

  return (
    <div>
      <MyAppBar></MyAppBar>
      <SearchBar></SearchBar>
      <h1>Unisex</h1>
      <p>This is the page for unisex products.</p>
    
      <Box sx={{ padding: 2 }}>
      <FormControl fullWidth>
        <Select
          labelId="sort-select-label"
          value={sortOption}
          onChange={handleSortChange}
        >

          {/* <MenuItem value="alphabetical-asc">Alphabetically, A-Z</MenuItem>
          <MenuItem value="alphabetical-desc">Alphabetically, Z-A</MenuItem> */}
          <MenuItem value="price-asc">Price, lowest to highest</MenuItem>
          <MenuItem value="price-desc">Price, highest to lowest</MenuItem>
          <MenuItem value="date-asc">Date, Oldest to Latest</MenuItem>
          <MenuItem value="date-desc">Date, Latest to Oldest</MenuItem>
        </Select>
      </FormControl>
      </Box>
      
    </div>
  );
};

export default Unisex;