import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';
import Select from 'react-select';
import ntc from 'ntcjs';
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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton as MuiIconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { ProductService } from '../../services/ProductService';
import zIndex from '@mui/material/styles/zIndex';

function CreateProduct() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const productService = new ProductService();

  const [colorName, setColorName] = React.useState(''); // Stores the user input for color name
  const [color, setColor] = React.useState('#fff');
  const [colors, setColors] = React.useState([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      categories: [],
      colors: [],
      sizes: [],
      currency: 'MYR',
      price: 0.00,
      stock: 0,
      rating: 0,
      gender: '',
      brand: '',
      images: []
    },
    onSubmit: async (values, actions) => {
      try {
        // Serialize colors and sizes to JSON strings
        const payload = {
          ...values,
          color: JSON.stringify(values.color),
          sizes: JSON.stringify(values.sizes),
        };

        const response = await productService.createProduct(payload);
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
    //   if (!values.category) {
    //     errors.category = 'Category is required';
    //   }
    //   if (!values.colors) {
    //     errors.color = 'Color is required';
    //   }
    //   if (!values.size) {
    //     errors.size = 'Size is required';
    //   }
    //   if (!values.gender) {
    //     errors.gender = 'Gender is required';
    //   }
      if (!values.price) {
        errors.price = 'Price is required';
      }
      if (!values.brand) {
        errors.brand = 'Brand is required';
      }
      if (!values.stock) {
        errors.stock = 'Stock is required';
      }

      return errors;
    },
  });

  const categoryOptions = [
    // { value: 'unisex', label: 'Unisex' },
    // { value: 'men', label: 'Men' },
    // { value: 'women', label: 'Women' },
    // { value: 'kids', label: 'Kids' },
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

  const genderOptions = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'U', label: 'Unisex' },
  ];

  const handleCategoryChange = selectedOptions => {
    formik.setFieldValue('categories', selectedOptions.map(option => ({ code: option.value, name: option.label })));
  };

//   const handleAddColor = () => {
//     const colorName = ntc.name(color)[1];
//     const newColor = { name: colorName, hex: color };
//     const updatedColors = [...colors, newColor];
//     setColors(updatedColors);
//     formik.setFieldValue('colors', updatedColors);
//   };

  const handleAddColor = () => {
    const hexCode = colorNameToHex(colorName);
    if (colorName) {
      const newColor = {name: colorName, hex: hexCode};
      const updatedColors = [...colors, newColor];
      setColors(updatedColors);
      formik.setFieldValue('colors', updatedColors);

      setColorName(''); // Clear input field after adding
    } else {
      alert('Invalid color name! Please enter a valid color.');
    }
  };

const handleRemoveColor = (index) => {
  const updatedColors = colors.filter((_, i) => i !== index);
  setColors(updatedColors);
  formik.setFieldValue('colors', updatedColors); // Update the formik values when a color is removed
};

  // Function to convert color name to hex code
  const colorNameToHex = (colorName) => {
    const tempDiv = document.createElement('div');
    tempDiv.style.color = colorName;
    document.body.appendChild(tempDiv);
    const computedColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);

    const rgbValues = computedColor.match(/\d+/g); // Extract RGB values
    if (!rgbValues) return null;

    const hexCode = `#${((1 << 24) + (+rgbValues[0] << 16) + (+rgbValues[1] << 8) + +rgbValues[2]).toString(16).slice(1).toUpperCase()}`;
    return hexCode;
  };
  
  const handleSizeChange = selectedOptions => {
    // Map selected options to format required by Formik
    const selected = selectedOptions.map(option => ({ value: option.value, label: option.label }));
    formik.setFieldValue('sizes', selected);
  };

  const handleGenderChange = selectedOption => {
    formik.setFieldValue('gender', selectedOption.value);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setPopoverOpen(true);
  };
  
  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };
  
  const customSelectStyles = {
    menu: (provided) => ({
        ...provided,
        zIndex: 1000, // Ensure drop down is above other elements
    }),
    control: (provided) => ({
      ...provided,
      minHeight: '50px',
      borderRadius: '4px',
      borderColor: '#b7b7b7',
      '&:hover': {
        borderColor: '#aaa',
      },
      zIndex: 1, // For the control, this (dropdown?) can be lower than the menu
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
          {/* <Box
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
          
          </Box> */}
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
              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <TextField
                    label="Enter Color Name"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    fullWidth
                    style={{ backgroundColor: 'white' }}
                />
                {/* <ChromePicker
                  color={color}
                  onChange={(updatedColor) => setColor(updatedColor.hex)}
                /> */}
                <Button onClick={handleAddColor} sx={{ marginLeft: 2, backgroundColor: '#b357ff', color: 'white' }}>
                  Add Color
                </Button>
              </Box>
              <List>
                {colors.map((color, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={color.name} secondary={color.hex} />
                    <ListItemSecondaryAction>
                      <MuiIconButton edge="end" onClick={() => handleRemoveColor(index)}>
                        <DeleteIcon />
                      </MuiIconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
              <Typography>Gender</Typography>
              <Select
                name="gender"
                options={genderOptions}
                className="basic-single-select"
                classNamePrefix="select"
                onChange={handleGenderChange}
                value={genderOptions.find(option => option.value === formik.values.gender)}
                // error={formik.touched.gender && Boolean(formik.errors.gender)}
                // helperText={formik.touched.gender && formik.errors.gender}
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
                  id="brand"
                  name="brand"
                  label="Brand"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.brand}
                  error={formik.touched.brand && Boolean(formik.errors.brand)}
                  helperText={formik.touched.brand && formik.errors.brand}
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
            <FormControl fullWidth margin="normal">
            <input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={(event) => {
                console.log(event)
                console.log(Array.from(event.currentTarget.files))
                formik.setFieldValue("images", Array.from(event.currentTarget.files));
                }}
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