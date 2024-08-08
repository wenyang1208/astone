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
        price: ''
    });

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
                        stock: res.data.stock
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
      <div style={{ 
          padding: '30px',
          backgroundColor: '#f3e5f5', // Set background color
          minHeight: '100vh',
          margin: 'auto', // Center the component horizontally
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{flex: '1'}}><img src={image} alt="Product Photo" style={{ width: '450px', paddingLeft: '60px', paddingTop: '30px'}} /></Box>
          <Box sx={{flex: '1', paddingTop: '50px'}}>
          <Typography variant="h4" style={{ marginBottom: '20px' }}>{product.name}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Description: ${product.description}`}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Category: ${product.category.replace(/[\[\]']+/g, '').split(', ').join(', ')}`}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Colors: ${product.colors.map(color => color.name.charAt(0).toUpperCase() + color.name.slice(1)).join(', ')}`}</Typography>
          <Typography variant="body1" style={{ marginBottom: '10px' }}>{`Sizes: ${product.sizes.map(size => size.label).join(', ')}`}</Typography>
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