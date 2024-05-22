import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useFormik, prepareDataForValidation  } from 'formik';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';


function CreateProduct() {
  const [product, setProducts] = useState([]);

  const navigate = useNavigate();

  const productService = new ProductService();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: [],
      colors: [],
      sizes: [],
      currency: 'MYR',
      price: 0.00,
      stock: 0
    },
    onSubmit: async (values, actions) => {
      try {
        const response = await productService.createProduct(values);
        if (response) {
          alert('Product created successfully !');
          navigate('/productlist'); // Redirect to ProductView
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
    }
  });

  const handleCategoryChange = event => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => ({
      name: option.value,
      code: option.dataset.code
    }));
    formik.setFieldValue('categories', selectedOptions);
  };

  const handleSizeSelectChange = event => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => ({
      name: option.value,
      code: option.dataset.code
    }));
    formik.setFieldValue('sizes', selectedOptions);
  };

  return (
    <div style= {{margin:'20px'}}>
      <h1>Create Product</h1>

      <form onSubmit={formik.handleSubmit}>
        <div style={{margin: '10px'}}>
          <label htmlFor="name" style={{margin: '10px'}}>Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div>{formik.errors.name}</div>}
        </div>
        <div style={{margin: '10px'}}>
          <label htmlFor="description" style={{margin: '10px'}}>Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && <div>{formik.errors.description}</div>}
        </div>
        <div style={{margin: '10px'}}>
          <label htmlFor="categories" style={{margin: '10px'}}>Category:</label>
          <select multiple name="categories" onChange={handleCategoryChange} value={formik.values.categories}>
              <option value="Unisex" data-code="unisex">Unisex</option>
              <option value="Men" data-code=",men">Men</option>
              <option value="Women" data-code="women">Women</option>
              <option value="Kids" data-code="kids">Kids</option>
            </select>
        </div>
        <div style={{margin: '10px'}}>
          <label htmlFor="color"style={{margin: '10px'}}>Color:</label>
          <ChromePicker
              id="description"
              name="description"
              color={formik.values.colors}
              onChange={color => formik.setFieldValue('color', [{name: tinycolor(color).toName(), code: color.hex}])}
          />
        </div>
        <div style={{margin: '10px'}}>
            <label htmlFor="sizes" style={{margin: '10px'}}>Sizes:</label>
            <select multiple name="sizes" onChange={handleSizeSelectChange} value={formik.values.sizes}>
              <option value="Small" data-code="S">Small</option>
              <option value="Medium" data-code="M">Medium</option>
              <option value="Large" data-code="L">Large</option>
              <option value="Extra Large" data-code="XL">Extra Large</option>
            </select>
          </div>
        <div style={{margin: '10px'}}>
          <label htmlFor="currency">Currency:</label>
          <input
            id="currency"
            name="currency"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.currency}
          />
          {formik.errors.currency && <div>{formik.errors.currency}</div>}
        </div>
        <div style={{margin: '10px'}}>
          <label htmlFor="price" >Price:</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.errors.price && <div>{formik.errors.price}</div>}
        </div>
        <div style={{margin: '10px'}}>
          <label htmlFor="stock" style={{margin: '10px'}}>Stock:</label>
          <input
            id="stock"
            name="stock"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          {formik.errors.stock && <div>{formik.errors.stock}</div>}
        </div>
        <button type="submit" disabled={formik.isSubmitting} style={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' }, color: 'white' }}>Submit</button>
      </form>
    </div>
  );
}

export default CreateProduct;