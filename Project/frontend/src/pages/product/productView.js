import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';

function ProductView() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const productService = new ProductService();

    // Call the getProducts method from ProductService
    productService.getProducts()
      .then(res => {
        console.log(res);
        setDetails(res.data);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }, []);

  return (
    <div>
      <header>Data from Django REST</header>
      <hr />
      <h1>Products</h1>
      {/* Map over the details array in state to render product information */}
      {details.map((output, id) => (
        <div key={id}>
          <h2>{`Product name: ${output.name}`}</h2>
          <h2>{`Product price: ${output.currency + ' ' + output.price}`}</h2>
          <h2>{`Product quantity: ${output.stock}`}</h2>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ProductView;
