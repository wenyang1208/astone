import React, { useState, useEffect } from 'react';
import Header3 from '../components/header3';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid';

const Unisex = () => {
  const BASE_URL = 'http://localhost:8000';

  const [products, setProducts] = useState(null);

  const ProductCard = ({ product }) => (
    
    <Card style={styles.card}>
      <CardMedia
        style={styles.media}
        image={product.images.length > 0 ? `${BASE_URL}${product.images[0].image_url}` : 'https://via.placeholder.com/140'}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {product.description}
        </Typography>
        <Typography variant="body2" style={styles.price} component="p">
          Price: {product.currency} {product.price}
        </Typography>
        <Button variant="contained" color="primary" size="small">
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );

  return (

    <div>
      {/* add header to try alternative way of search bar, can del*/}
      <Header3></Header3>
      <div>
        <h1>Unisex</h1>
        <p>This is the page for women's products.</p>
      </div>
        <main style={styles.content}>
          {products == null ? (
            <Grid></Grid>
          ) : (
            <Grid container spacing={3}>
              {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </main>
      </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh',
  },
  sidebar: {
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    margin: '20px',
  },
  filter: {
    marginTop: '0',
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '10px',
  },
  checkbox: {
    marginRight: '10px',
  },
  section: {
    marginBottom: '20px',
  },
  content: {
    flexGrow: '1',
    padding: '20px',
  },
  card: {
    maxWidth: 345,
    margin: '20px',
  },
  media: {
    height: 200, // Increased height
  },
  price: {
    color: '#ff0000', // Changed color to red
  },
};
  
export default Unisex;