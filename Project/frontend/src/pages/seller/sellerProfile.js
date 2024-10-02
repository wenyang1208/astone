import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Box, Container, Paper, Grid, Typography, Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ACCESS_TOKEN } from '../../constant';
import { SellerService } from '../../services/SellerService';
import { ProductService } from '../../services/ProductService';
import { jwtDecode } from 'jwt-decode';
import SellerSidebar from '../../components/sellerSidebar';
import { TextField, FormHelperText } from '@mui/material';

const sellerService = new SellerService();
const productService = new ProductService();

const SellerProfile = () => {
    const [seller, setSeller] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
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
        console.log(sellerData.data);
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
        navigate(`/productlist/`);
        } else {
        // Specific error for shop name
        if (response.message && response.message.includes('A seller with this shop name already exists.')) {
            setShopNameError('Shop name already exists. Please choose a different one.');
        }else{
            const errorMessage = response.message || 'Failed to save seller profile';
            setNotification(errorMessage);
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
    if (shopNameError) {
        setShopNameError('');
    }
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN); // Remove the token from localStora
        navigate('/loginSeller'); // Redirect to the login page
    };
    
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!seller) return <Typography>No seller data found</Typography>;
    
    const isProfileComplete = seller && seller.phone_number && seller.address && seller.shop_name;
    if (isEditing) {
    console.log(`need to edit: ${isEditing}`);
    console.log(`no need to complete: ${!isProfileComplete}`);
    return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', width: '100%', py: 4 }}>
    <Container maxWidth="md">
            {notification && (
            <Typography color="error" sx={{ mb: 2 }}>
                {notification}
            </Typography>
            )}
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


    return(
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', width: '100%', py: 4 }}>
        <Grid container>
        <Grid item xs={1.5}>
          <SellerSidebar />
        </Grid>
    <Grid item xs>
    <Container>
    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#ffffff' }}>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4a4a4a' }}>
            {seller.shop_name}
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
            <Button 
            variant="outlined" 
            startIcon={<EditIcon />} 
            onClick={handleEdit}
            sx={{ borderColor: '#7D0DC3', color: '#7D0DC3', mr: 2 }}
            >
            Edit Profile
            </Button>
            <Button 
            variant="contained" 
            color="error" 
            onClick={handleLogout}
            >
            Logout
            </Button>
        </Grid>
        </Grid>
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
            <Typography variant="body1">Joined: {new Date(seller.user.date_joined.substring(0,10)).toLocaleDateString('en-GB')}</Typography>
        </Grid>
        </Grid>
    </Paper>
    </Container>
    </Grid>
    </Grid>
    </Box>
    
    );
}

export default SellerProfile;