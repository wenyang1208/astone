import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Paper, Grid, Typography, Button, Divider, TextField, FormHelperText,
  Card, CardContent, Avatar, Chip, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { styled } from '@mui/material/styles';
import { ACCESS_TOKEN } from '../../constant';
import { SellerService } from '../../services/SellerService';
import { ProductService } from '../../services/ProductService';
import { jwtDecode } from 'jwt-decode';
import SellerSidebar from '../../components/sellerSidebar';
import SellerHeader from '../../components/sellerHeader';

const sellerService = new SellerService();
const productService = new ProductService();

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  margin: 'auto',
  backgroundColor: theme.palette.primary.main,
}));

const InfoItem = ({ icon, primary, secondary }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    {icon}
    <Box sx={{ ml: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {primary}
      </Typography>
      <Typography variant="body1" fontWeight="medium">
        {secondary}
      </Typography>
    </Box>
  </Box>
);

const SellerProfile = () => {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [shopNameError, setShopNameError] = useState('');
  const [formValues, setFormValues] = useState({ shopName: '' });

  const navigate = useNavigate();
  const token = localStorage.getItem(ACCESS_TOKEN);
  const sellerId = jwtDecode(token).seller_id;

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

  const handleEdit = () => setIsEditing(true);

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
        navigate(`/sellerProfile`);
      } else {
        if (response.message && response.message.includes('A seller with this shop name already exists.')) {
          setShopNameError('Shop name already exists. Please choose a different one.');
        } else {
          setNotification(response.message || 'Failed to save seller profile');
        }
      }
    } catch (err) {
      setNotification('Failed to save seller profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeller({ ...seller, [name]: value });
  };

  const handleShopName = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    if (shopNameError) setShopNameError('');
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!seller) return <Typography>No seller data found</Typography>;

  if (isEditing) {
    return (
      <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', width: '100%', py: 4 }}>
        <Container maxWidth="md">
          {notification && (
            <Typography color="error" sx={{ mb: 2 }}>
              {notification}
            </Typography>
          )}
          <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
              Edit Your Profile
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="shopName"
                    required
                    fullWidth
                    id="shopName"
                    label="Shop Name"
                    value={formValues.shopName || ''}
                    onChange={handleShopName}
                    error={!!shopNameError}
                  />
                  {shopNameError && (
                    <FormHelperText error>{shopNameError}</FormHelperText>
                  )}
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
                sx={{ mt: 4, mb: 2, py: 1.5, px: 4 }}
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
    <Box sx={{ display: 'flex', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <SellerHeader sx={{ position: 'fixed', zIndex: 1200 }} />
      <Grid container>
        <Grid item xs={1.5} sx={{ backgroundColor: '#ffffff' }}>
          <SellerSidebar />
        </Grid>
        <Grid item xs sx={{ p: 3, pt: 10 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <StyledCard>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <StyledAvatar>
                      {seller.user.first_name[0]}{seller.user.last_name[0]}
                    </StyledAvatar>
                    <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                      {seller.shop_name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {seller.user.first_name} {seller.user.last_name}
                    </Typography>
                    <Chip
                      label="Verified Seller"
                      color="primary"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                      sx={{ mt: 3, borderColor: '#7D0DC3', color: '#7D0DC3' }}
                      fullWidth
                    >
                      Edit Profile
                    </Button>
                  </CardContent>
                </StyledCard>
              </Grid>
              <Grid item xs={12} md={8}>
                <StyledCard>
                  <CardContent >
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Seller Information
                    </Typography>
                    <InfoItem
                      icon={<EmailIcon color="primary" />}
                      primary="Email"
                      secondary={seller.user.username}
                    />
                    <InfoItem
                      icon={<PhoneIcon color="primary" />}
                      primary="Phone"
                      secondary={seller.phone_number}
                    />
                    <InfoItem
                      icon={<LocationOnIcon color="primary" />}
                      primary="Address"
                      secondary={seller.address}
                    />
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Shop Statistics
                    </Typography>
                    <InfoItem
                      icon={<ShoppingBasketIcon color="primary" />}
                      primary="Total Products"
                      secondary={products.length}
                    />
                    <InfoItem
                      icon={<CalendarTodayIcon color="primary" />}
                      primary="Joined"
                      secondary={new Date(seller.user.date_joined.substring(0,10)).toLocaleDateString('en-GB')}
                    />
                  </CardContent>
                </StyledCard>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SellerProfile;