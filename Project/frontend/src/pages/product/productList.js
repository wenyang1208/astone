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
      <div style={{backgroundColor: '#eedafe', paddingTop: '20px'}}>
        <div sx= {{position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000}}>
        <header style={{fontSize: '30px', paddingLeft: '20px'}}>Shop name</header>
        <hr/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
          <p style={{ display: 'flex', flex: '1', paddingLeft: '20px', fontSize: '30px', fontWeight: 'bold'}}>Products</p>
          <Box sx={{display: 'flex', alignItems: 'end', margin: '0', padding: '0'}}>
            <Link to="/product/create" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#A020F0', 
                  '&:hover': { backgroundColor: '#7D0DC3' }, 
                  color: 'white', 
                  marginRight: '0.5rem' , 
                  borderRadius: '40px', // Make the button circular
                  height: '40px', // Adjust height as needed
                  width: '40px', // Adjust width as needed
                  padding: 0, // Remove padding to ensure circular shape
                  fontSize: '25px'
                }}
              >
                +
              </Button>
            </Link>
          </Box>
        </div>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '35px', paddingLeft: '20px', paddingTop: '20px'}}>
          {products.map((output, id) => (
              <Box 
                  key={id} 
                  sx={{ 
                      padding: '30px', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 7px #babcbb', 
                      minWidth: '280px',
                      maxWidth: '350px',
                      backgroundColor: '#f9f9f9',
                      marginBottom: '10px',
                  }}
              >
                  <Typography variant="h6" sx={{fontSize: '14px'}}>
                          {`Product ID: ast234567890`}<br />
                          {`Name: ${output.name}`}<br />
                          {`Price: ${output.currency} ${output.price}`}<br />
                          {`Stock: ${output.stock}`}
                  </Typography>
              </Box>
          ))}
        </div> 
      </div>
    );
  }
  
  export default ProductList;