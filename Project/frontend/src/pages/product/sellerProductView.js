import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function SellerProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editProduct, setEditProduct] = useState({
        name: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const productService = new ProductService();
            try {
                const res = await productService.getProductById(id);
                if (res && res.data) {
                    setProduct(res.data);
                    setEditProduct({
                        name: res.data.name,
                        description: res.data.description,
                        price: res.data.price
                    });
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
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const handleSaveChanges = async () => {
      const productService = new ProductService();
      try {
          const updatedProduct = {
              name: editProduct.name,
              description: editProduct.description,
              price: editProduct.price,
              stock: editProduct.stock,
              // Add any other necessary fields
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
  
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: '30px' }}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="body1">{`Category: ${product.category}`}</Typography>
            <Typography variant="body1">{`Colors: ${product.colors.name}`}</Typography>
            <Typography variant="body1">{`Sizes: ${product.sizes.code}`}</Typography>
            <Typography variant="body1">{`Price: ${product.currency} ${product.price}`}</Typography>
            <Typography variant="body1">{`Stock: ${product.stock}`}</Typography>
            <Button variant="contained" color="primary" onClick={handleEditOpen}>
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
    );
}

export default SellerProductView;