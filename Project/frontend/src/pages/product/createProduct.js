import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';
import Select from 'react-select';
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  InputAdornment,
} from '@mui/material';
import { ProductService } from '../../services/ProductService';

function CreateProduct() {
  const navigate = useNavigate();
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
    // { value: 'top', label: 'Top' },
    // { value: 'bottom', label: 'Bottom' },
    // { value: 'accessories', label: 'Accessories' },
    // { value: 'footwear', label: 'Footwear' },
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
  
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '50px',
      borderRadius: '4px',
      borderColor: '#ccc',
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
    <Box sx={{ margin: '20px' }}>
      <Typography variant="h4">Create Product</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box
          sx={{
            flex: 1,
            border: '1px solid #ccc',
            padding: '20px',
            textAlign: 'center',
            marginRight: '20px',
          }}
        >
          <Typography variant="h6">Add Image</Typography>
          {/* Image upload component goes here */}
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
            <Typography>Sizes</Typography>
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
                        borderLeft: '1px solid #ccc',
                        height: '24px',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
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
            />
          </FormControl>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            sx={{ backgroundColor: '#007bff', color: 'white', '&:hover': { backgroundColor: '#0056b3' }, marginTop: '20px' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CreateProduct;