import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';
import { Formik, Form, Field, ErrorMessage, useFormik  } from 'formik';
import { ChromePicker } from 'react-color';
import tinycolor from 'tinycolor2';

function CreateProduct() {
  const [details, setDetails] = useState([]);


  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category:'',
      colors: [],
      sizes: [],
      currency: 'MYR',
      price: 0.00,
      stock: 0
    },
    onSubmit: (values, actions) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 1000);
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

  const handleSizeSelectChange = event => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => ({
      name: option.value,
      code: option.dataset.code
    }));
    formik.setFieldValue('sizes', selectedOptions);
  };

  return (
    <div>
      <h1>Create Product</h1>

      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div>{formik.errors.name}</div>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && <div>{formik.errors.description}</div>}
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.category}
          />
          {formik.errors.category && <div>{formik.errors.category}</div>}
        </div>
        <div>
          <label htmlFor="color">Color:</label>
          <ChromePicker
              id="description"
              name="description"
              color={formik.values.colors}
              onChange={color => formik.setFieldValue('color', [{name: tinycolor(color).toName(), code: color.hex}])}
          />
        </div>
        <div>
            <label htmlFor="sizes">Sizes:</label>
            <select multiple name="sizes" onChange={handleSizeSelectChange} value={formik.values.sizes}>
              <option value="Small" data-code="S">Small</option>
              <option value="Medium" data-code="M">Medium</option>
              <option value="Large" data-code="L">Large</option>
              <option value="Extra Large" data-code="XL">Extra Large</option>
            </select>
          </div>
        <div>
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
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
          {formik.errors.price && <div>{formik.errors.price}</div>}
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            id="stock"
            name="stock"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.stock}
          />
          {formik.errors.stock && <div>{formik.errors.stock}</div>}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>Submit</button>
      </form>
    </div>
  );
}

export default CreateProduct;