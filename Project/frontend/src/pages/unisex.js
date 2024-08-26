import React, {useState, useEffect} from 'react';
import SearchBar from '../components/searchBar';
import { Typography, Select, MenuItem, InputLabel, FormControl,  Box} from '@mui/material';
import MyAppBar from '../components/appBar';


const Unisex = () => {


  // for sorting
  const [sortOption, setSortOption] = useState('price-asc');

  // handle dropdown change 
  const handleSortChange = (e) => {
    setSortOption(e.target.value);

  };

  const handleSortItems = () => {
     // Add sorting logic here if needed

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