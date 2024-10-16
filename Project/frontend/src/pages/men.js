import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService';
import { Card, Paper, CardContent, Typography, Button, TextField, Checkbox, FormControlLabel, FormGroup, Slider, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import MyAppBar from '../components/appBar';

const Men = () => {
  const BASE_URL = 'https://astone-backend-app.onrender.com';

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFlag, setFilterFlag] = useState(null);
  const [filters, setFilters] = useState({ brands: [], clothingTypes: [] });
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedClothingTypes, setSelectedClothingTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedProducts, setSortedProducts] = useState([]);

  const navigate = useNavigate();

  const extractFilters = (products) => {
    const brands = new Set();
    const clothingTypes = new Set();

    products.forEach(product => {
      brands.add(product.brand);
      product.category.split(',').forEach(category => clothingTypes.add(category.trim()));
    });

    return {
      brands: Array.from(brands),
      clothingTypes: Array.from(clothingTypes),
    };
  };

  useEffect(() => {
    const productService = new ProductService();

    productService.getProducts()
      .then(res => {
        const menProducts = res.data.filter(product => product.gender.toLowerCase() === "m");
        setProducts(menProducts);
        setFilters(extractFilters(menProducts));
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  useEffect(() => {
    if (filterFlag !== null && filterFlag) {
      const filtered = products.filter(product =>
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedClothingTypes.length === 0 || selectedClothingTypes.some(type => product.category.includes(type))) &&
        product.price >= priceRange[0] && product.price <= priceRange[1] &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSortedProducts(filtered);
    } else {
      const productService = new ProductService();
      productService.getProducts()
        .then(res => {
          const menProducts = res.data.filter(product => product.gender.toLowerCase() === "m");
          setSortedProducts(menProducts);
        })
        .catch(err => {
          console.error('Error fetching products:', err);
        });
    }
  }, [filterFlag, products, selectedBrands, selectedClothingTypes, priceRange, searchTerm]);

  useEffect(() => {
    const sorted = [...sortedProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedProducts(sorted);
  }, [sortOrder]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBrandChange = (event) => {
    const { value, checked } = event.target;
    setSelectedBrands(prev =>
      checked ? [...prev, value] : prev.filter(brand => brand !== value)
    );
  };

  const handleClothingTypeChange = (event) => {
    const { value, checked } = event.target;
    setSelectedClothingTypes(prev =>
      checked ? [...prev, value] : prev.filter(type => type !== value)
    );
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleApplyFilter = () => {
    setFilterFlag(true);
  };

  const handleClearFilter = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedClothingTypes([]);
    setPriceRange([0, 500]);
    setFilterFlag(false);
  };

  const handleCardClick = (id) => {
    navigate(`/buyer_products/${id}/`);
  };

  const ProductCard = ({ product }) => (
    <Card style={styles.card} onClick={() => handleCardClick(product.id)}>
      <Paper>
        <img
          src={(product?.images && product.images.length > 0) ? `${BASE_URL}${product.images[0].image_url}` : 'https://via.placeholder.com/750'}
          alt={product?.name}
          style={{ width: '100%', height: 'auto' }}
        />
      </Paper>
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
      </CardContent>
    </Card>
  );

  return (
    <div>
      <MyAppBar />
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
              <FormGroup>
                {filters.brands.map((brand, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        value={brand}
                        onChange={handleBrandChange}
                        checked={selectedBrands.includes(brand)}
                      />
                    }
                    label={brand}
                  />
                ))}
              </FormGroup>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subHeading}>Type</h3>
              <FormGroup>
                {filters.clothingTypes.map((type, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        value={type}
                        onChange={handleClothingTypeChange}
                        checked={selectedClothingTypes.includes(type)}
                      />
                    }
                    label={type}
                  />
                ))}
              </FormGroup>
            </div>

            <div style={styles.section}>
              <h3 style={styles.subHeading}>Price</h3>
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={500}
                style={{ marginBottom: '20px' }}
              />
            </div>

            <Button variant="contained" color="primary" onClick={handleApplyFilter} style={{ width: "100%", marginBottom: "10px" }}>
              Apply Filter(s)
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClearFilter} style={{ width: "100%", marginBottom: "10px" }}>
              Clear Filter(s)
            </Button>
            <div style={styles.section}>
              <h3 style={styles.subHeading}>Sort by Price</h3>
              <Select
                value={sortOrder}
                onChange={handleSortOrderChange}
                fullWidth
                variant="outlined"
                style={{ marginBottom: '20px' }}
              >
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </div>
          </div>
        </aside>
        <main style={styles.content}>
          {sortedProducts.length === 0 ? (
            <Typography>No products found</Typography>
          ) : (
            <Grid container spacing={4}>
              {sortedProducts.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </main>
      </div>
    </div>
  );
 }


  const styles = {
    card: {
      maxWidth: 345,
      margin: '20px auto', // Center the card and add vertical margin
      cursor: 'pointer',
    },
    media: {
      height: 300
    },
    price: {
      color: 'green'
    },
    container: {
      display: 'flex',
      flexDirection: 'row'
    },
    sidebar: {
      width: '20%',
      padding: '20px'
    },
    content: {
      width: '80%',
      padding: '20px'
    },
    filter: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px'
    },
    heading: {
      marginBottom: '20px'
    },
    section: {
      marginBottom: '20px'
    },
    subHeading: {
      marginBottom: '10px'
    }
  };

export default Men;
