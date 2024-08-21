import React, { useState, useEffect } from 'react';
import { ProductService } from '../services/ProductService'; 

// const BASE_URL = 'http://localhost:3000';

const CompareProducts = () => {
  const [products, setProducts] = useState([]); 
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  useEffect(() => {
    const productService = new ProductService();

    //get products from the backend
    productService.getProducts()
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const handleCompare = () => {
    // the comparison logic
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Compare Products</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
        <select onChange={(e) => setProduct1(e.target.value)} value={product1}>
          <option value="" disabled>Select First Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>

        <select onChange={(e) => setProduct2(e.target.value)} value={product2}>
          <option value="" disabled>Select Second Product</option>
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
      </div>

      <button onClick={handleCompare}>Start Comparison</button>

      {product1 && product2 && (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
          <div style={{ width: '45%', textAlign: 'center' }}>
            <img 
              src={products.find(p => p.id === product1).images.length > 0 
                ? `${BASE_URL}${products.find(p => p.id === product1).images[0].image_url}` 
                : 'https://via.placeholder.com/140'} 
              alt={product1} 
              style={{ width: '100%', height: 'auto' }} 
            />
            <p>{products.find(p => p.id === product1).description}</p>
          </div>
          <div style={{ width: '45%', textAlign: 'center' }}>
            <img 
              src={products.find(p => p.id === product2).images.length > 0 
                ? `${BASE_URL}${products.find(p => p.id === product2).images[0].image_url}` 
                : 'https://via.placeholder.com/140'} 
              alt={product2} 
              style={{ width: '100%', height: 'auto' }} 
            />
            <p>{products.find(p => p.id === product2).description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareProducts;
