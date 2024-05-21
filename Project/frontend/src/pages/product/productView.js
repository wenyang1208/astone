import React, { useState, useEffect } from 'react';
import { ProductService } from '../../services/ProductService';
import "../../components/productstyle.css";


// harcoded 
const Aston = ({ className, divClassName }) => {
  return (
    <div className={`aston ${className}`}>
      <div className={`text-wrapper ${divClassName}`}>Astoné</div>
    </div>
  );
};


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

  // hardcoded
  return (
    <div className="product">
      <div className="div">
        <div className="top-bar">
          <div className="logo">
            <Aston className="aston-instance" divClassName="design-component-instance-node" />
          </div>
          <div className="navbar">
            <div className="text-wrapper-2">MEN</div>
            <div className="text-wrapper-3">WOMEN</div>
            <div className="text-wrapper-4">UNISEX</div>
            <div className="text-wrapper-5">SUPPORT</div>
            <div className="text-wrapper-6">SELL</div>
            <img className="person" alt="Person" src="/img/person-fill0-wght400-grad0-opsz24-1.svg" />
            <img
              className="shopping-cart"
              alt="Shopping cart"
              src="/img/shopping-cart-fill0-wght400-grad0-opsz24-1.svg"
            />
            <div className="ellipse" />
            <div className="ellipse-2" />
            <div className="ellipse-3" />
            <div className="ellipse-4" />
            <div className="ellipse-5" />
            <div className="ellipse-6" />
          </div>
        </div>
        <img className="element" alt="Element" src="/img/4238500600-2-6-8-1.png" />
        <p className="men-clothing-shirts">
          <span className="span">Men &gt; Clothing &gt; </span>
          <span className="text-wrapper-7">Shirts</span>
        </p>
        <img className="img" alt="Element" src="/img/4238500600-2-1-8.png" />
        <img className="element-2" alt="Element" src="/img/4238500600-2-2-8.png" />
        <img className="element-3" alt="Element" src="/img/4238500600-2-3-8.png" />
        <img className="element-4" alt="Element" src="/img/4238500600-2-4-8.png" />
        <img className="element-5" alt="Element" src="/img/4238500600-2-8-8.png" />
        <p className="p">Regular Fit Crew Neck Red T-Shirt</p>
        <div className="text-wrapper-8">TeeThreads</div>
        <div className="text-wrapper-9">Size</div>
        <div className="text-wrapper-10">339 Reviews</div>
        <div className="text-wrapper-11">4.8</div>
        <div className="text-wrapper-12">39.90MYR</div>
        <div className="text-wrapper-13">-32%</div>
        <img className="grade" alt="Grade" src="/img/grade-fill1-wght400-grad0-opsz24-1.svg" />
        <img className="verified" alt="Verified" src="/img/verified-fill1-wght400-grad0-opsz24-1.svg" />
        <div className="text-wrapper-14">59.90MYR</div>
        <img className="vector" alt="Vector" src="/img/vector-1.svg" />
        <div className="overlap-group">
          <img className="XS" alt="Xs" src="/img/xs.png" />
        </div>
        <div className="overlap">
          <div className="ellipse-7" />
          <div className="text-wrapper-15">S</div>
        </div>
        <div className="div-wrapper">
          <div className="text-wrapper-16">M</div>
        </div>
        <div className="overlap-2">
          <div className="text-wrapper-17">L</div>
        </div>
        <div className="overlap-3">
          <div className="text-wrapper-18">XL</div>
        </div>
        <div className="overlap-4">
          <img
            className="shopping-cart-fill"
            alt="Shopping cart"
            src="/img/shopping-cart-fill0-wght400-grad0-opsz24-2.svg"
          />
          <div className="text-wrapper-19">Add to Cart</div>
        </div>
        <div className="text-wrapper-20">3.9MYR</div>
        <img
          className="local-shipping"
          alt="Local shipping"
          src="/img/local-shipping-fill1-wght400-grad0-opsz24-1.svg"
        />
        <div className="overlap-5">
          <div className="overlap-6">
            <img className="vector-2" alt="Vector" src="/img/vector-2.png" />
            <img className="mask-group" alt="Mask group" src="/img/mask-group-3.png" />
            <div className="text-wrapper-21">Details</div>
          </div>
          <div className="text-wrapper-22">Reviews</div>
        </div>
        <p className="text-wrapper-23">
          Made from 100% cotton, this shirt is a must-have basic in every man’s wardrobe.
        </p>
      </div>
    </div>

    // <div>
    //   <header>Astone</header>
    //   <h1>Products</h1>
    //   {/* Map over the details array in state to render product information */}
    //   {details.map((output, id) => (
    //     <div key={id}>
    //       <h2>{`Product name: ${output.name}`}</h2>
    //       <h2>{`Product price: ${output.currency + ' ' + output.price}`}</h2>
    //       <h2>{`Product quantity: ${output.stock}`}</h2>
    //       <br />
    //     </div>
    //   ))}
    // </div>
  );

}

export default ProductView;