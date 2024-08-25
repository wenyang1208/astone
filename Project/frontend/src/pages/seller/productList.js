import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'; 
import Divider from '@mui/material/Divider'; 
import { SellerService } from '../../services/SellerService';
import { ProductService } from '../../services/ProductService';
import { ACCESS_TOKEN } from '../../constant';
import { jwtDecode } from 'jwt-decode';
import image from '../product/crew-neck.png';

const sellerService = new SellerService();
const productService = new ProductService();

const ProductList = () => {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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
        
        const productData = await productService.getProducts();
        setProducts(productData.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await sellerService.editSeller(sellerId, {
        shop_name: formValues.shopName || seller.shop_name,
        phone_number: seller.phone_number,
        address: seller.address,
      });

      if (response.status === 200) {
        setIsEditing(false);
        const updatedData = await sellerService.getSellerById(sellerId);
        setSeller(updatedData.data);
      } else {
        setError('Failed to save seller profile');
      }
    } catch (err) {
      setError('Failed to save seller profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({ ...seller, [name]: value });
  };

  const handleShopName = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
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

  const isProfileComplete = seller && seller.phone_number && seller.address && seller.shop_name;

  if (isEditing || !isProfileComplete) {
    return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', width: '100%', py: 4 }}>
      <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h4" gutterBottom>
            {isEditing ? 'Edit Your Profile' : 'Complete Your Profile'}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="shopName"
                  required
                  fullWidth
                  id="shopName"
                  label="Shop Name"
                  value={formValues.shopName ||''}
                  onChange={handleShopName}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name="phone_number"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                value={seller.phone_number || ''}
                onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={seller.address || ''}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', width: '100%', py: 4 }}>
      <Container>
        <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#ffffff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4a4a4a' }}>
            {seller.shop_name}
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />} 
            onClick={handleEdit}
            sx={{ borderColor: '#7D0DC3', color: '#7D0DC3' }}
          >
            Edit Profile
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#7D0DC3' }}>Seller Information</Typography>
            <Typography variant="body1">Name: {seller.user.first_name} {seller.user.last_name}</Typography>
            <Typography variant="body1">Email: {seller.user.username}</Typography>
            <Typography variant="body1">Phone: {seller.phone_number}</Typography>
            <Typography variant="body1">Address: {seller.address}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#7D0DC3' }}>Shop Statistics</Typography>
            <Typography variant="body1">Total Products: {products.length}</Typography>
            <Typography variant="body1">Joined: {new Date(seller.user.date_joined.substring(0,10)).toLocaleDateString()}</Typography>
            {/* Add more shop statistics here */}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4a4a4a' }}>Products</Typography>
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
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                }, 
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={() => handleMouseEnter(output.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleProductClick(output.id)}
            >
              <img src={image} alt="Product Photo" style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>{output.name}</Typography>
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
                    color: '#ff4444',
                    '&:hover': { color: '#cc0000' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDialog(output.id);
                  }}
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
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from your shop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmRemoveProduct} sx={{ color: '#ff4444' }}>
            Confirm
          </Button>
          <Button onClick={handleCloseDialog} sx={{ color: '#7D0DC3' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </Box>
  );
};

export default ProductList;