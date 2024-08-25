import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { 
  Typography, Button, TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, Box, Grid, Paper, Chip, Rating, Divider
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import image from './crew-neck.png';

function SellerProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [promotionOpen, setPromotionOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const [promotion, setPromotion] = useState({
        discountPercentage: '',
        startDate: '',
        endDate: ''
    });
    const [afterPromotionPrice, setAfterPromotionPrice] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        const productService = new ProductService();
        try {
            const res = await productService.getProductById(id);
            if (res && res.data) {
                setProduct(res.data);
                setEditProduct({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    stock: res.data.stock
                });
                // Initialize promotion if it exists
                if (res.data.promotion) {
                    setPromotion({
                        discountPercentage: res.data.promotion.discountPercentage.toString(),
                        startDate: res.data.promotion.startDate,
                        endDate: res.data.promotion.endDate
                    });
                    setAfterPromotionPrice(res.data.price.toString());
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const handlePromotionOpen = () => setPromotionOpen(true);
    const handlePromotionClose = () => {
        setPromotionOpen(false);
        setAfterPromotionPrice(null);
        setPromotion({
            discountPercentage: '',
            startDate: '',
            endDate: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const handlePromotionChange = (e) => {
        const { name, value } = e.target;
        setPromotion(prev => ({ ...prev, [name]: value }));
    
        if (name === 'discountPercentage' && product) {
            const discountPercentage = parseFloat(value);
            const originalPrice = parseFloat(product.originalPrice || product.price);
            if (!isNaN(discountPercentage) && !isNaN(originalPrice) && discountPercentage > 0 && discountPercentage <= 100) {
                const discountedPrice = originalPrice * (1 - (discountPercentage / 100));
                setAfterPromotionPrice(discountedPrice.toFixed(2));
            } else {
                setAfterPromotionPrice(null);
            }
        }
    };

    const handleSaveChanges = async () => {
        const productService = new ProductService();
        try {
            const updatedProduct = {
                name: editProduct.name,
                description: editProduct.description,
                price: editProduct.price,
                stock: editProduct.stock,
            };
            const res = await productService.editProduct(id, updatedProduct);
            if (res && res.status === 200) {
                setProduct(res.data);
                handleEditClose();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleApplyPromotion = async () => {
        const productService = new ProductService();
        try {
            const updatedProduct = {
                ...product,
                originalPrice: product.originalPrice || product.price,
                price: afterPromotionPrice,
                promotion: {
                    discountPercentage: parseFloat(promotion.discountPercentage),
                    startDate: promotion.startDate,
                    endDate: promotion.endDate
                }
            };
            const res = await productService.editProduct(id, updatedProduct);
            if (res && res.status === 200) {
                setProduct(res.data);
                handlePromotionClose();
            }
        } catch (error) {
            console.error('Error applying promotion:', error);
        }
    };

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Grid container spacing={4} sx={{ px: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <img src={image} alt="Product" style={{ width: '100%', height: 'auto' }} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom>{product.name}</Typography>
                        <Rating value={4} readOnly sx={{ mb: 2 }} />
                        {product.originalPrice ? (
                            <>
                                <Typography variant="h6" color="textSecondary" style={{ textDecoration: 'line-through' }}>
                                    Original Price: {product.currency} {product.originalPrice}
                                </Typography>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    Sale Price: {product.currency} {product.price}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h5" color="primary" gutterBottom>
                                {product.currency} {product.price}
                            </Typography>
                        )}
                        <Typography variant="body1" paragraph>{product.description}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" gutterBottom>Category:</Typography>
                        <Box sx={{ mb: 2 }}>
                            {product.category.replace(/[\[\]']+/g, '').split(', ').map((cat, index) => (
                                <Chip key={index} label={cat} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>
                        <Typography variant="subtitle1" gutterBottom>Colors:</Typography>
                        <Box sx={{ mb: 2 }}>
                            {product.colors.map((color, index) => (
                                <Chip key={index} label={color.name} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>
                        <Typography variant="subtitle1" gutterBottom>Sizes:</Typography>
                        <Box sx={{ mb: 2 }}>
                            {product.sizes.map((size, index) => (
                                <Chip key={index} label={size.label} sx={{ mr: 1, mb: 1 }} />
                            ))}
                        </Box>
                        <Typography variant="subtitle1" gutterBottom>
                            Stock: {product.stock}
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Button 
                                variant="contained" 
                                startIcon={<EditIcon />}
                                onClick={handleEditOpen} 
                                sx={{ mr: 2 }}
                            >
                                Edit Product
                            </Button>
                            <Button 
                                variant="outlined" 
                                startIcon={<LocalOfferIcon />}
                                onClick={handlePromotionOpen}
                            >
                                {product.originalPrice ? 'Update Promotion' : 'Apply Promotion'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        value={editProduct.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={editProduct.description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={editProduct.price}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        name="stock"
                        label="Stock"
                        type="number"
                        fullWidth
                        value={editProduct.stock}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={promotionOpen} onClose={handlePromotionClose}>
                <DialogTitle>{product.originalPrice ? 'Update Promotion' : 'Apply Promotion'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="discountPercentage"
                        label="Discount Percentage"
                        type="number"
                        fullWidth
                        value={promotion.discountPercentage}
                        onChange={handlePromotionChange}
                    />
                    <TextField
                        margin="dense"
                        name="startDate"
                        label="Start Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={promotion.startDate}
                        onChange={handlePromotionChange}
                    />
                    <TextField
                        margin="dense"
                        name="endDate"
                        label="End Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={promotion.endDate}
                        onChange={handlePromotionChange}
                    />
                    {afterPromotionPrice !== null && (
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            After Promotion Price: {product.currency} {afterPromotionPrice}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePromotionClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleApplyPromotion} color="primary">
                        {product.originalPrice ? 'Update' : 'Apply'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SellerProductView;