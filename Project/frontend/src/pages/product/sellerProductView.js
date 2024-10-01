import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import { 
  Typography, Button, TextField, Dialog, DialogActions, DialogContent, 
  DialogTitle, Box, Grid, Paper, Chip, Rating, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import { PromotionService } from '../../services/PromotionService';

function SellerProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [promotionOpen, setPromotionOpen] = useState(false);
    const [amountSaved, setAmountSaved] = useState(null);
    const [daysUntilStart, setDaysUntilStart] = useState(null);
    const navigate = useNavigate();
    const BASE_URL = 'http://localhost:8000';
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        images: []
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
                setProduct({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    stock: res.data.stock,
                    images: BASE_URL + res.data.images[0].image_url,
                    sizes: res.data.sizes,
                    colors: res.data.colors,
                    category: res.data.category,
                    currency: res.data.currency,
                    original_price: res.data.original_price || res.data.price,
                    promotion: res.data.promotions
                });
                setEditProduct({
                    name: res.data.name,
                    description: res.data.description,
                    price: res.data.price,
                    stock: res.data.stock,
                    images: BASE_URL + res.data.images[0].image_url,
                    sizes: res.data.sizes,
                    colors: res.data.colors
                });
                setExistingImages(res.data.images);

                // Initialize promotion if it exists
                // const promotionService = new PromotionService();
                // const promotionRes = await promotionService.getPromotions();
                console.log(res.data.promotions);
                if (res.data.promotions) {
                    console.log('Promotion:', res.data.promotions);
                    setPromotion({
                        discountPercentage: res.data.promotions.discount_percentage.toString(),
                        startDate: res.data.promotions.start_date,
                        endDate: res.data.promotions.end_date
                    });

                    console.log('Promotion:', res.data.promotions);
                    const today = new Date();
                    const startDate = new Date(res.data.promotions.startDate);
                    const endDate = new Date(res.data.promotions.endDate);
                    // Calculate days until promotion starts
                    const timeDiff = startDate - today;
                    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                    if (daysLeft > 0) {
                        setDaysUntilStart(daysLeft);
                    } else {
                        setDaysUntilStart(null);
                    }
            
                setAfterPromotionPrice(res.data.price.toString());
                //setAmountSaved((res.data.original_price - afterPromotionPrice).toFixed(2));
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    useEffect(() => {
        console.log(product);
    }, [product] )

    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);
    const handlePromotionOpen = () => {
        setPromotionOpen(true);
        if (product.promotion){
            handleEndPromotion();
        }
    };

    const handlePromotionClose = () => {
        setPromotionOpen(false);
        setAfterPromotionPrice(null);
        // setPromotion({
        //     discountPercentage: '',
        //     startDate: '',
        //     endDate: ''
        // });
    };

    const handleEndPromotion = async () => {
        const promotionService = new PromotionService();
        const productService = new ProductService();
    
        try {
            // End promotion via the service
            const res = await promotionService.endPromotion(product.id);
    
            if (res && res.status === 200) {
                // Remove promotion details from the product state after ending promotion
                const updatedProduct = {
                    ...product,
                    promotion: null, // Clear promotion details
                    price: product.original_price, // Reset the price to the original price
                };
    
                // Update the product via the product service
                const productUpdateRes = await productService.editProduct(product.id, updatedProduct);
    
                if (productUpdateRes && productUpdateRes.status === 200) {
                    // Update local state with the updated product
                    setProduct(productUpdateRes.data);
                    setPromotionOpen(false); // Close the dialog
                } else {
                    console.error('Error updating product after ending promotion:', productUpdateRes);
                }
            } else {
                console.error('Error ending promotion:', res);
            }
        } catch (error) {
            console.error('Error in handleEndPromotion:', error);
        }
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
                const savedAmount = original_price - discountedPrice;
                setAmountSaved(savedAmount.toFixed(2));
            } else {
                setAfterPromotionPrice(null);
                setAmountSaved(null);
            }
        }
        console.log(promotion);
    };
    

    const handleSaveChanges = async () => {
        const productService = new ProductService();
        try {
            const updatedProduct = {
                name: editProduct.name,
                description: editProduct.description,
                //price: editProduct.price,
                original_price: editProduct.price,
                stock: editProduct.stock,
            };

            // if (!product.original_price) {
            //     updatedProduct.original_price = editProduct.price;
            // }

            const formData = new FormData(); // Create a new FormData instance

            // Append other product fields to formData
            formData.append('name', updatedProduct.name);
            formData.append('description', updatedProduct.description);
            formData.append('price', updatedProduct.original_price);
            // if (!product.original_price) {
            //     formData.append('original_price', updatedProduct.original_price); // Append original price only if needed
            // }
            //formData.append('original_price', updatedProduct.original_price);
            formData.append('stock', updatedProduct.stock);

            // if (editProduct.images && editProduct.images.length > 0) {
            //     editProduct.images.forEach((image, index) => {
            //         console.log(image);
            //         formData.append('images', image);
            //     });
            // }
            const res = await productService.editProduct(id, updatedProduct);
            console.log(res);
            if (res && res.status === 200) {
                setProduct(res.data);
                handleEditClose();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleApplyPromotion = async () => {
        const promotionService = new PromotionService();
        const productService = new ProductService();
        try {
            // Update product details with the new price after promotion
            const updatedProduct = {
                ...product,
                price: afterPromotionPrice,  // Apply the discounted price
                //original_price: product.original_price,  // Set original_price only if not already set
            };
    
            // Promotion payload to be sent to the backend
            const addPromotion = {
                product_id: id,
                discountPercentage: parseFloat(promotion.discountPercentage),
                startDate: promotion.startDate,
                endDate: promotion.endDate
            };
    
            // Apply the promotion and update the product
            const resPromotion = await promotionService.createPromotion(addPromotion);
            const resProductUpdate = await productService.editProduct(id, updatedProduct);
    
            if (resProductUpdate.status === 200 && resPromotion.status === 201) {
                setProduct(resProductUpdate.data);
                handlePromotionClose();
            }

        } catch (error) {
            console.error('Error applying promotion:', error);
        }
    };
    

    useEffect(() => {
        console.log(product)
    }, [product]);

    const handleBack = () => {
        navigate('/productlist'); // This will navigate to the previous page in the history
    };

    const today = new Date().toISOString().split('T')[0]; 

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return '';  // Handle invalid dates
        const day = date.getDate();
        const month = date.getMonth() + 1;  // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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
                    {existingImages.length > 0 ? (
                            existingImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={BASE_URL + image.image_url}
                                    alt={'Product'}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            ))
                        ) : (
                            <Typography>No images available</Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h4" gutterBottom>{product.name}</Typography>
                        <Rating value={0} readOnly sx={{ mb: 2 }} />
                        {product.price < product.original_price ? (
                            <>
                                <Typography variant="h6" color="textSecondary" style={{ textDecoration: 'line-through' }}>
                                    Original Price: {product.currency} {product.original_price}
                                </Typography>
                                <Typography variant="h5" color="primary" gutterBottom>
                                    Sale Price: {product.currency} {product.price}
                                </Typography>
                                
                                <Typography variant="body1" color="primary" gutterBottom>
                                    Amount save: {product.currency} {(product.original_price-product.price).toFixed(2)}
                                </Typography>
                                <Typography>
                                    Valid from {formatDate(promotion.startDate)} to {formatDate(promotion.endDate)}
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
                            {console.log(product.category)}
                            {product.category && product.category.replace(/[\[\]']+/g, '').split(', ').map((cat, index) => (
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
                        {Array.isArray(product.sizes) ? (
                            product.sizes.map((size, index) => (
                                <Chip key={index} label={size.label} sx={{ mr: 1, mb: 1 }} />
                            ))
                        ) : (
                            <Typography>No sizes available</Typography>
                        )}
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
                                {product.promotion ? 'End Promotion' : 'Apply Promotion'}
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
                    {/* <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        Existing Images:
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, flexWrap: 'wrap' }}>
                        {existingImages.length > 0 ? (
                            existingImages.map((images, index) => (
                                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img
                                        src={BASE_URL + images.image_url}
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
                    /> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">Cancel</Button>
                    <Button onClick={handleSaveChanges} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            {product.promotion ? (
                <Dialog open={promotionOpen} onClose={handlePromotionClose}>
                <DialogTitle>End Promotion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Are you sure you want to end the promotion?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePromotionClose} color="primary">Cancel</Button>
                    <Button onClick={handleEndPromotion} color="primary">End Promotion</Button>
                </DialogActions>
                </Dialog>
                
            ) : (
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
                            inputProps={{
                                min: today, // Restrict selection to today and future
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
                            inputProps={{
                                min: promotion.startDate || today, // Ensure end date can't be before start date
                            }}
                        />
                        {afterPromotionPrice && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                New Price After Promotion: {product.currency} {afterPromotionPrice}
                            </Typography>
                        )}
                        {amountSaved && (
                            <Typography variant="body1" sx={{ mt: 2 }}>
                                Amount save: {product.currency} {amountSaved}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePromotionClose} color="primary">Cancel</Button>
                        <Button onClick={handleApplyPromotion} color="primary">Apply</Button>
                    </DialogActions>
                </Dialog>
            )}

        </Box>
    );
}

export default SellerProductView;