import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';
import Select from 'react-select';
import image from './/image.png';
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  InputAdornment, 
  IconButton,
  Popover,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { ProductService } from '../../services/ProductService';

function CreateProduct() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const productService = new ProductService();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categories: [],
      color: [],
      sizes: [],
      currency: 'MYR',
      price: 0.00,
      stock: 0,
      rating: 0,
    },
    onSubmit: async (values, actions) => {
      try {
        const response = await productService.createProduct(values);
        if (response) {
          alert('Product created successfully!');
          navigate('/productlist');
        }
      } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product');
      } finally {
        actions.setSubmitting(false);
      }
    },
    validate: values => {
      const errors = {};

      if (!values.name) {
        errors.name = 'Name is required';
      }

      if (!values.description) {
        errors.description = 'Description is required';
      }
      // Add more validation rules as needed

      return errors;
    },
  });

  const categoryOptions = [
    { value: 'unisex', label: 'Unisex' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'footwear', label: 'Footwear' },
  ];

  const sizeOptions = [
    { value: 'XS', label: 'Xtra Small' },
    { value: 'S', label: 'Small' },
    { value: 'M', label: 'Medium' },
    { value: 'L', label: 'Large' },
    { value: 'XL', label: 'Xtra Large' },
    { value: 'XXL', label: 'Xtra Xtra Large' },
    { value: 'NA', label: 'Free Size' },
  ];

  const handleCategoryChange = selectedOptions => {
    formik.setFieldValue('categories', selectedOptions.map(option => ({ code: option.value, name: option.label })));
  };

  const handleColorChange = color => {
    const selectedColor = { code: color.hex, name: tinycolor(color.hex).toName() };
    formik.setFieldValue('colors', [selectedColor]);
  };

  const handleSizeChange = selectedOptions => {
    // Map selected options to format required by Formik
    const selected = selectedOptions.map(option => ({ value: option.value, label: option.label }));
    formik.setFieldValue('sizes', selected);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };
  
  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };
  
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '50px',
      borderRadius: '4px',
      borderColor: '#b7b7b7',
      '&:hover': {
        borderColor: '#aaa',
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#333',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#333',
      '&:hover': {
        backgroundColor: '#d32f2f',
        color: 'white',
      },
    }),
  };

  return (
    <div style={{backgroundColor: '#f2e2fe', minHeight: '100vh', padding: '20px'}}>
      <Box sx={{ margin: '20px' }}>
        <Typography variant="h4" sx={{paddingBottom: '3px'}}>Create Your Product</Typography>
        <Typography sx={{fontSize: '15px'}} >Start your fashion journey with Astone and unlock endless possibilities for creating captivating, trend-setting products.</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box
            sx={{
              flex: 1,
              border: '2px solid #b7b7b7',
              borderRadius: '4px',
              padding: '20px',
              textAlign: 'center',
              marginRight: '20px',
              marginTop: '15px',
            }}
          >
            <Typography variant="h6">Add Image</Typography>
          
          </Box>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ flex: 1 }}>
          <FormControl fullWidth margin="normal">
              <TextField
                id="name"
                name="name"
                label="Name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="description"
                name="description"
                label="Description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Typography>Category</Typography>
              <Select
                isMulti
                name="categories"
                options={categoryOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleCategoryChange}
                value={formik.values.category}
                styles={customSelectStyles}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Typography>Color</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ChromePicker
                id="description"
                name="description"
                color={formik.values.colors}
                onChange={color => formik.setFieldValue('color', [{name: tinycolor(color).toName(), code: color.hex}])}
              />
              </Box>
            </FormControl>
            <FormControl fullWidth margin="normal">
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>Sizes
              <IconButton 
                size="small"
                onClick={handlePopoverOpen}
                sx={{ marginLeft: 1 }}
              >
                <InfoIcon />
              </IconButton>
            </Typography>
            <Popover
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box sx={{ padding: 2 }}>
                {/* Add your size measurement guide content here */}
                <Typography>Size Measurement Guide:</Typography>
                <img src={image} alt="Size Chart" style={{ maxWidth: '85%' }} />
                <Typography sx={{fontSize: '12px'}}>Astone supports true and clear size measurement, ensuring every product matches its detailed size guide. </Typography>
              </Box>
            </Popover>
            <Select
              isMulti
              name="sizes"
              options={sizeOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSizeChange}
              value={formik.values.sizes}
              styles={customSelectStyles}
            />
          </FormControl>
            
            <FormControl fullWidth margin="normal">
              <TextField
                id="price"
                name="price"
                label="Price"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.price}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      MYR
                      <Box
                        component="span"
                        sx={{
                          margin: '0 10px',
                          borderLeft: '1px solid #b7b7b7',
                          height: '24px',
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                id="stock"
                name="stock"
                label="Stock"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.stock}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                helperText={formik.touched.stock && formik.errors.stock}
                style={{ backgroundColor: 'white' }}
              />
            </FormControl>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              sx={{ backgroundColor: '#b357ff', color: 'white', '&:hover': { backgroundColor: '#0056b3' }, marginTop: '20px' , width:'80px', height:'40px'}}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default CreateProduct;