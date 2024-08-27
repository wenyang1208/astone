import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { 
  Typography, Button, TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, Box, Grid, Paper, Chip, Rating, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import image from './crew-neck.png';
import { PromotionService } from '../../services/PromotionService';

function SellerProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [promotionOpen, setPromotionOpen] = useState(false);
    const navigate = useNavigate();
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        images: [],
        stock: ''
    });
    const [promotion, setPromotion] = useState({
        discountPercentage: '',
        startDate: '',
        endDate: ''
    });
    const [afterPromotionPrice, setAfterPromotionPrice] = useState(null);
    const [existingImages, setExistingImages] = useState(editProduct.images || []);

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
                    stock: res.data.stock,
                        images: res.data.images
                });
                    setExistingImages(res.data.images);
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
        const { name, value, files } = e.target;
        if (name === 'images') {
            setEditProduct({ ...editProduct, images: Array.from(files) });
        } else {
            setEditProduct({ ...editProduct, [name]: value });
        }
    };

    const handlePromotionChange = (e) => {
        const { name, value } = e.target;
        setPromotion(prev => ({ ...prev, [name]: value }));
    
        if (name === 'discountPercentage' && product) {
            const discountPercentage = parseFloat(value);
            const original_price = parseFloat(product.original_price || product.price);
            if (!isNaN(discountPercentage) && !isNaN(original_price) && discountPercentage > 0 && discountPercentage <= 100) {
                const discountedPrice = original_price * (1 - (discountPercentage / 100));
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
                original_price: editProduct.price,
                stock: editProduct.stock,
            };
            if (editProduct.images && editProduct.images.length > 0) {
                editProduct.images.forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
            }
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
        const promotionService = new PromotionService();
        try {
            const updatedProduct = {
                ...product,
                original_price: product.original_price || product.price,
                price: afterPromotionPrice,
            };
            console.log(product.id);
            const addPromotion = {
                product_id: product.id,
                discountPercentage: parseFloat(promotion.discountPercentage),
                startDate: promotion.startDate,
                endDate: promotion.endDate
            }
            const resPromotion = await promotionService.createPromotion(addPromotion);
            const res = await productService.editProduct(id, updatedProduct);
            if (res && res.status === 200 && resPromotion.status === 200) {
                setProduct(res.data);
                handlePromotionClose();
            }
        } catch (error) {
            console.error('Error applying promotion:', error);
        }
    };

    const handleBack = () => {
        navigate('/productlist'); // This will navigate to the previous page in the history
    };

    if (!product) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Box sx={{ px: 4, mb: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBack}
                >
                    Back
                </Button>
            </Box>
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
                        {product.price < product.original_price ? (
                            <>
                                <Typography variant="h6" color="textSecondary" style={{ textDecoration: 'line-through' }}>
                                    Original Price: {product.currency} {product.original_price}
                                </Typography>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    Sale Price: {product.currency} {product.price}
                                </Typography>
                            </>
                        ) : (
                            <Typography variant="h5" color="primary" gutterBottom>
                                Price: {product.currency} {product.price}
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
                                {product.original_price ? 'Add Promotion' : 'Apply Promotion'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Product Name"
                        value={editProduct.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        name="description"
                        label="Product Description"
                        value={editProduct.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        name="price"
                        label="Product Price"
                        value={editProduct.price}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        name="stock"
                        label="Product Stock"
                        value={editProduct.stock}
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        Existing Images:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                        {existingImages.length > 0 ? (
                            existingImages.map((imageUrl, index) => (
                                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img
                                        src={imageUrl}
                                        alt={`Existing Image ${index + 1}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                                    />
                                    <Button 
                                        variant="text" to remove or handle image removal
                                        color="error"
                                        onClick={() => setExistingImages(existingImages.filter((_, i) => i !== index))}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">No existing images available.</Typography>
                        )}
                    </Box>
                    <input
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
                        onChange={handleInputChange}
                        style={{ marginTop: '20px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={promotionOpen} onClose={handlePromotionClose}>
                <DialogTitle>Apply Promotion</DialogTitle>
                <DialogContent>
                    <TextField
                        name="discountPercentage"
                        label="Discount Percentage"
                        value={promotion.discountPercentage}
                        onChange={handlePromotionChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={promotion.startDate}
                        onChange={handlePromotionChange}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={promotion.endDate}
                        onChange={handlePromotionChange}
                        fullWidth
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {afterPromotionPrice && (
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            New Price After Promotion: {product.currency} {afterPromotionPrice}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePromotionClose} color="primary">Cancel</Button>
                    <Button onClick={handleApplyPromotion} color="primary">Apply</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default SellerProductView;