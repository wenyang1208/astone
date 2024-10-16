import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { SellerService } from '../../services/SellerService';
import { ProductService } from '../../services/ProductService';
import { ACCESS_TOKEN } from '../../constant';
import { jwtDecode } from 'jwt-decode';
import image from '../product/crew-neck.png';
import SellerSidebar from '../../components/sellerSidebar';
import SellerHeader from '../../components/sellerHeader';

const sellerService = new SellerService();
const productService = new ProductService();
const BASE_URL = 'http://localhost:8000';
const ProductList = () => {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [shopNameError, setShopNameError] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const sellerId = jwtDecode(token).seller_id;

  const [formValues, setFormValues] = useState({
    shopName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerData = await sellerService.getSellerById(sellerId);
        setSeller(sellerData.data);
        
        const productData = await productService.getAuthProducts();
        setProducts(productData.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseEnterDelete = (productId) => {
    
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleOpenDialog = (productId) => {
    setSelectedProductId(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const handleConfirmRemoveProduct = async () => {
    if (selectedProductId !== null) {
      try {
        await productService.deleteProduct(selectedProductId);
        setProducts(products.filter(product => product.id !== selectedProductId));
        handleCloseDialog();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!seller) return <Typography>No seller data found</Typography>;

  return (
    <Box sx={{ display: 'flex' }}>
      <SellerHeader sx={{ position: 'fixed', zIndex: 1200 }} />
      <Grid container>
        <Grid item xs={1.5}>
          <SellerSidebar />
        </Grid>
      <Grid item xs >
      <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4a4a4a', mt: 8}}>
              {seller.shop_name}
          </Typography>
          <hr 
            style = {
              {
                color: '#AAA7AD',
                boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                margin: '10px 0px 20px 0px',
              }
            }></hr>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4a4a4a' }}>My Products</Typography>
            <Link to="/product/create" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#7D0DC3', 
                  '&:hover': { backgroundColor: '#5c0992' }, 
                  color: 'white', 
                  borderRadius: '20px', 
                  px: 3,
                }}
              >
                Add New Product
              </Button>
            </Link>
          </Box>
          
        <Grid container spacing={3}>
          {products.map((output) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={output.id}>
              <Paper 
                elevation={2}
                sx={{ 
                  p: 2,
                  // borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  }, 
                  position: 'relative',
                  cursor: 'pointer',
                  height: '400px', // Set a minimum height for each Paper component
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={() => handleMouseEnter(output.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleProductClick(output.id)}
              >
                {output.images.length > 0 && output.images[0].image_url ?
                        <img 
                            src={output.images[0].image_url}                                 
                            alt="Product Photo" 
                            style={{ 
                              width: '240px',
                              height: '240px',
                              objectFit: 'contain',
                              alignSelf: 'center',

                            }} 
                        />
                    :
                        <img src={image} alt="Product Photo" style={{ width: '240px' }} />
                }
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>{output.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  ID: ast{String(output.id).padStart(8, '0')}
                </Typography>
                <Typography variant="h6" sx={{ color: '#7D0DC3', mb: 1 }}>
                  {output.currency} {output.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {output.stock}
                </Typography>
                <Rating 
                  value={output.rating || 0} 
                  readOnly 
                  sx={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    color: '#FFD700',
                  }}
                />
                {hoveredProductId === output.id && (
                  <DeleteIcon
                    sx={{ 
                      position: 'absolute', 
                      top: '10px', 
                      right: '10px', 
                      cursor: 'pointer',
                      color: '#000000',
                      '&:hover': { 
                        color: '#cc0000',
                      },    
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDialog(output.id);
                    }}
                    onMouseEnter={() => handleMouseEnterDelete(output.id)}
                  />
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Remove Product ID: ast{String(selectedProductId).padStart(8, '0')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to remove this product from your shop?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: '#7D0DC3' }}>
              Cancel
            </Button>
            <Button onClick={handleConfirmRemoveProduct} sx={{ color: '#ff4444' }}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ProductList;