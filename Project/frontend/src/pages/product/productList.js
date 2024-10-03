import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';
import { Link , useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import image from './/crew-neck.png';


function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const BASE_URL = 'http://localhost:8000';
    useEffect(() => {
        const fetchProducts = async () => {
            const productService = new ProductService();
            try {
                const res = await productService.getAuthProducts();
                if (res && res.data) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

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
                const productService = new ProductService();
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

    return (
      <div style={{backgroundColor: '#eedafe', minHeight: '100vh'}}>
      <div sx= {{position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100}}>
        <header style={{fontSize: '30px', padding: '20px'}}>Shop name</header>
        <hr/>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', width: '95%'}}>
          <p style={{ paddingLeft: '30px', fontSize: '32px', fontWeight: 'bold'}}>Products</p>
          <Box>
            <Link to="/product/create" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#ba68ff', 
                  '&:hover': { backgroundColor: '#7D0DC3' }, 
                  color: 'white', 
                  borderRadius: '50%', 
                  height: '60px', 
                  width: '60px', 
                  minWidth: '40px', 
                  fontSize: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1px 0 0 1px',
                }}
              >
                +
              </Button>
            </Link>
          </Box>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', paddingLeft: '30px'}}>
            {products.map((output, id) => (
                <Box 
                    key={output.id} 
                    sx={{ 
                        padding: '30px', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 7px #babcbb', 
                        minWidth: '280px',
                        maxWidth: '350px',
                        backgroundColor: '#f9f9f9',
                        marginBottom: '0px',
                        position: 'relative',
                        '&:hover': { backgroundColor: '#cbcccb' }, 
                    }}
                    onMouseEnter={() => handleMouseEnter(output.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleProductClick(output.id)}
                >
                    {output.images.length > 0 && output.images[0].image_url ?
                            <img 
                                src={`${BASE_URL}${output.images[0].image_url}`}                                 
                                alt="Product Photo" 
                                style={{ width: '200px' }} 
                            />
                        :
                            <img src={image} alt="Product Photo" style={{ width: '200px' }} />
                    }
                    <Typography variant="h6" sx={{fontSize: '14px'}}>
                        {`Product ID: ast${String(output.id).padStart(8, '0')}`}<br />
                        {`Name: ${output.name}`}<br />
                        {`Price: ${output.currency} ${output.price}`}<br />
                        {`Stock: ${output.stock}`}<br />
                        {/* {`Rating: ${output.rating}`} */}
                    </Typography>
                    <Rating 
                            value={output.rating || 0} 
                            readOnly 
                            sx={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                color: 'gold',
                                '& .MuiRating-iconFilled': {
                                    color: 'gold',
                                },
                                '& .MuiRating-iconEmpty': {
                                    color: 'lightgrey',
                                },
                                '& .MuiRating-iconHover': {
                                    color: 'darkgoldenrod',
                                }
                            }}
                        />
                    {hoveredProductId === output.id && (
                        <DeleteIcon
                            style={{ position: 'absolute', top: '12px', right: '15px', cursor: 'pointer' }}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the onClick of the Box from triggering
                                handleOpenDialog(output.id);
                            }}
                        />
                    )}
                </Box>
            ))}
        </div>

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
                    <Button onClick={handleConfirmRemoveProduct} color="primary">
                        Confirm
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ProductList;