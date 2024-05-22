import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../../services/ProductService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SellerProductView() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productService = new ProductService();
            try {
                const res = await productService.getProductById(id);
                if (res && res.data) {
                    setProduct(res.data);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ padding: '30px' }}>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="body1">{`Category: ${product.category}`}</Typography>
            <Typography variant="body1">{`Colors: ${product.colors.join(', ')}`}</Typography>
            <Typography variant="body1">{`Sizes: ${product.sizes.join(', ')}`}</Typography>
            <Typography variant="body1">{`Price: ${product.currency} ${product.price}`}</Typography>
            <Typography variant="body1">{`Stock: ${product.stock}`}</Typography>
        </Box>
    );
}

export default SellerProductView;
