import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ProductList() {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        const productService = new ProductService();
        try {
          const res = await productService.getProducts();
          if (res && res.data) {
            setProducts(res.data);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, []);
  
    return (
      <div style={{ marginLeft: '20px', marginTop: '10px' }}>
        <header style={{ fontSize: '30px' }}>Shop name</header>
        <hr />
        <h1>Products</h1>
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '95%' }}>
          <Box sx={{ marginBottom: '20px' }}>
            <Link to="/product/create" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ backgroundColor: '#A020F0', '&:hover': { backgroundColor: '#7D0DC3' }, color: 'white', marginRight: '0.5rem' }}>
                Add
              </Button>
            </Link>
          </Box>
          <Box sx={{ marginBottom: '20px' }}>
            <Link to="/product/create" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ backgroundColor: '#A020F0', '&:hover': { backgroundColor: '#7D0DC3' }, color: 'white' }}>
                Remove
              </Button>
            </Link>
          </Box>
          </div>
          {products.map((output, id) => (
            <div key={id}>
              <Typography variant="h6">{`Product name: ${output.name}`}</Typography>
              <Typography variant="h6">{`Product price: ${output.currency} ${output.price}`}</Typography>
              <Typography variant="h6">{`Product quantity: ${output.stock}`}</Typography>
              <br />
            </div>
          ))}
        
      </div>
    );
  }
  
  export default ProductList;