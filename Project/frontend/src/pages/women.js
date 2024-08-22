import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';
import { Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import MyAppBar from '../components/appBar';

const Men = () => {
  const BASE_URL = 'http://localhost:8000';

  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFlag, setFilterFlag] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const productService = new ProductService();

    // Call the getProducts method from ProductService
    productService.getProducts()
      .then(res => {
        // Filter products for men
        const womenProducts = res.data.filter(product => product.category.toLowerCase() === "women" || product.category.toLowerCase() === "women's");
        setProducts(womenProducts);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);
  
  useEffect(() => {
    if(filterFlag == true) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
    }
    else if(filterFlag == false) {

      const productService = new ProductService();

      productService.getProducts()
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
    }
  }, [filterFlag]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApplyFilter = () => {
    setFilterFlag(true);
    console.log('Apply filter with search term:', searchTerm);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setFilterFlag(false);
  };

  const handleCardClick = (id) => {
    navigate(`/buyer_products/${id}/`);
  };


  const ProductCard = ({ product }) => (
    <Card style={styles.card} onClick={() => handleCardClick(product.id)}>
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
          {product.currency} {product.price}
        </Typography>
        <Button variant="contained" color="primary" size="small">
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <MyAppBar></MyAppBar>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <div style={styles.filter}>
            <h2 style={styles.heading}>Filters</h2>
            
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ marginBottom: '20px' }}
            />
            
            <div style={styles.section}>
              <h3 style={styles.subHeading}>Brands</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <input type="checkbox" id="uniqlo" style={styles.checkbox} />
                  <label htmlFor="uniqlo">Uniqlo</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="pullbear" style={styles.checkbox} />
                  <label htmlFor="pullbear">Pull & Bear</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="hm" style={styles.checkbox} />
                  <label htmlFor="hm">H&M</label>
                </li>
              </ul>
            </div>
            
            <div style={styles.section}>
              <h3 style={styles.subHeading}>Type</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <input type="checkbox" id="shirts" style={styles.checkbox} />
                  <label htmlFor="shirts">Shirts</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="pants" style={styles.checkbox} />
                  <label htmlFor="pants">Pants</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="shorts" style={styles.checkbox} />
                  <label htmlFor="shorts">Shorts</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="shoes" style={styles.checkbox} />
                  <label htmlFor="shoes">Shoes</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="accessories" style={styles.checkbox} />
                  <label htmlFor="accessories">Accessories</label>
                </li>
              </ul>
            </div>
            
            <div style={styles.section}>
              <h3 style={styles.subHeading}>Price</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <input type="checkbox" id="price1" style={styles.checkbox} />
                  <label htmlFor="price1">$1-50</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="price2" style={styles.checkbox} />
                  <label htmlFor="price2">$50-100</label>
                </li>
              </ul>
            </div>
            
            <div style={styles.section}>
              <h3 style={styles.subHeading}>Seller Location</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <input type="checkbox" id="selangor" style={styles.checkbox} />
                  <label htmlFor="selangor">Selangor</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="sabah" style={styles.checkbox} />
                  <label htmlFor="sabah">Sabah</label>
                </li>
                <li style={styles.listItem}>
                  <input type="checkbox" id="kualalumpur" style={styles.checkbox} />
                  <label htmlFor="kualalumpur">Kuala Lumpur</label>
                </li>
              </ul>
            </div>

            <Button variant="contained" color="primary" onClick={handleApplyFilter} style={{ width:"100%", marginBottom:"10px" }}>
              Apply Filter(s)
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClearFilter} style={{ width:"100%", marginBottom:"10px" }}>
              Clear Filter(s)
            </Button>
          </div>
        </aside>
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
    width: '250px', // Fixed width for the sidebar
    flexShrink: 0,
    padding: '20px',
    backgroundColor: '#ffffff',
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
    cursor: 'pointer'
  },
  media: {
    height: 200, // Increased height
  },
  price: {
    color: '#ff0000', // Changed color to red
  },
};

export default Men;
