import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import image from './/crew-neck.png';
import { Box } from '@mui/material';

function SellerProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        images: []
    });
    const [existingImages, setExistingImages] = useState(editProduct.images || []);

    useEffect(() => {
        const fetchProduct = async () => {
            const productService = new ProductService();
            try {
                const res = await productService.getProductById(id);
                console.log(res)
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
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setEditProduct({ ...editProduct, images: Array.from(files) });
        } else {
            setEditProduct({ ...editProduct, [name]: value });
        }
    };
    
    const handleSaveChanges = async () => {
        const productService = new ProductService();
        try {
            const formData = new FormData();
            formData.append('name', editProduct.name);
            formData.append('description', editProduct.description);
            formData.append('price', editProduct.price);
            formData.append('stock', editProduct.stock);
    
            if (editProduct.images && editProduct.images.length > 0) {
                editProduct.images.forEach((image, index) => {
                    formData.append(`images[${index}]`, image);
                });
            }
    
            const res = await productService.editProduct(id, formData);
            if (res && res.status === 200) {
                setProduct(res.data);
                handleEditClose();
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
      <div style={{ 
          padding: '30px',
          backgroundColor: '#f3e5f5', // Set background color
          minHeight: '100vh',
          margin: 'auto', // Center the component horizontally
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* <Box sx={{flex: '1'}}><img src={image} alt="Product Photo" style={{ width: '450px', paddingLeft: '60px', paddingTop: '30px'}} /></Box> */}
          <Box>
                        <Typography variant="h6">Existing Images</Typography>
                        {console.log(existingImages)}
                        <Box display="flex" flexWrap="wrap" gap="10px">
                            {existingImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:8000${image.image_url}`}
                                    alt={`Product Image ${index}`}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            ))}
                        </Box>
            </Box>
            <br></br>
          <Box sx={{flex: '1', paddingTop: '50px'}}>
          <Typography variant="h4" style={{ marginBottom: '20px' }}>{product.name}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Description: ${product.description}`}</Typography>
          {/* <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Category: ${product.category.replace(/[\[\]']+/g, '').split(', ').join(', ')}`}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Colors: ${product.colors.map(color => color.name.charAt(0).toUpperCase() + color.name.slice(1)).join(', ')}`}</Typography> */}
          {/* <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Sizes: ${product.sizes.map(size => size.label).join(', ')}`}</Typography> */}
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Price: ${product.currency} ${product.price}`}</Typography>
          <Typography variant="body1" style={{ marginBottom: '20px' }}>{`Stock: ${product.stock}`}</Typography>
          <Button variant="contained" color="primary" onClick={handleEditOpen} style={{ marginRight: '10px' }}>
              Edit
          </Button>
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
                    <input
                        id="images"
                        name="images"
                        type="file"
                        multiple
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
            </Box>
        </Box>
      </div>
    );
}

export default SellerProductView;