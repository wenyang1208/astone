import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/header';
import MainBanner from '../components/mainBanner';
import FeaturedProduct from '../components/featuredProduct';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PathConstants from '../routes/pathConstants';


// const sections = [
//   { title: 'Men', url: '#' },
//   { title: 'Women', url: '#' },
//   { title: 'Unisex', url: '#' },
//   { title: 'Support', url: '#' },
//   { title: 'Sell', url: '#' },
//   { title: 'About', url: '#' },
//   { title: 'Compare Products', url: '#' },  

// ];

const mainBanner = {
  title: 'SALE!',
  description:
    "Up to 30% off!",
  image: 'https://source.unsplash.com/random?clothing',
  imageText: 'main image description',
  linkText: 'See for yourself!',
};

// const products = [
//   {
//     title: 'Product 1',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Product 2',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Product 1',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Product 1',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Product 1',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Product 1',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   }
// ];

const featuredProducts = [
  {
    name: 'Stylish Jacket',
    description: 'A stylish and comfortable jacket perfect for the winter season.',
    price: '$99.99',
    image: 'https://source.unsplash.com/random?jacket', // Replace with actual image URL
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Red', hex: '#FF0000' },
      { name: 'Green', hex: '#008000' },
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Yellow', hex: '#FFFF00' },
      { name: 'Orange', hex: '#FFA500' },
    ],
    tags: ['winter', 'jacket', 'stylish'],
    brand: 'FashionBrand',
    dateAdded: '2023-05-20',
  },

  {
    name: 'Elegant Dress',
    description: 'An elegant dress suitable for all occasions.',
    price: '$59.99',
    image: 'https://source.unsplash.com/random?dress',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    tags: ['summer', 'dress', 'elegant'],
    dateAdded: '2023-05-21',
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily exercise.',
    price: '$79.99',
    image: 'https://source.unsplash.com/random?shoes',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Red', hex: '#FF0000' },
    ],
    tags: ['shoes', 'running', 'sport'],
    dateAdded: '2023-05-22',
  },
  {
    name: 'Casual T-Shirt',
    description: 'A comfortable and stylish t-shirt for everyday wear.',
    price: '$29.99',
    image: 'https://source.unsplash.com/random?tshirt',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Red', hex: '#FF0000' },
      { name: 'Green', hex: '#008000' },
    ],
    tags: ['casual', 't-shirt', 'comfortable'],
    dateAdded: '2023-05-23',
  },
  {
    name: 'Formal Suit',
    description: 'A classic formal suit for special occasions.',
    price: '$199.99',
    image: 'https://source.unsplash.com/random?suit',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Gray', hex: '#808080' },
    ],
    tags: ['formal', 'suit', 'classic'],
    dateAdded: '2023-05-24',
  },
  {
    name: 'Cozy Sweater',
    description: 'A cozy sweater to keep you warm during chilly days.',
    price: '$49.99',
    image: 'https://source.unsplash.com/random?sweater',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Red', hex: '#FF0000' },
    ],
    tags: ['sweater', 'cozy', 'warm'],
    dateAdded: '2023-05-25',
  },
  {
    name: 'Leather Bag',
    description: 'A stylish leather bag for everyday use.',
    price: '$149.99',
    image: 'https://source.unsplash.com/random?bag',
    brand: 'FashionBrand',
    sizes: [],
    colors: [
      { name: 'Brown', hex: '#A52A2A' },
      { name: 'Black', hex: '#000000' },
    ],
    tags: ['bag', 'leather', 'stylish'],
    dateAdded: '2023-05-26',
  },
  {
    name: 'Designer Watch',
    description: 'A luxury designer watch for special occasions.',
    price: '$299.99',
    image: 'https://source.unsplash.com/random?watch',
    brand: 'FashionBrand',
    sizes: [],
    colors: [
      { name: 'Silver', hex: '#C0C0C0' },
      { name: 'Gold', hex: '#FFD700' },
    ],
    tags: ['watch', 'luxury', 'designer'],
    dateAdded: '2023-05-27',
  },
  {
    name: 'Striped Polo Shirt',
    description: 'A classic polo shirt with stylish stripes.',
    price: '$39.99',
    image: 'https://source.unsplash.com/random?polo-shirt',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Green', hex: '#008000' },
      { name: 'Red', hex: '#FF0000' },
    ],
    tags: ['polo-shirt', 'stripes', 'classic'],
    dateAdded: '2023-05-28',
  },
  {
    name: 'Denim Jeans',
    description: 'Stylish denim jeans for casual wear.',
    price: '$49.99',
    image: 'https://source.unsplash.com/random?jeans',
    brand: 'FashionBrand',
    sizes: [
      { name: '28', code: '28' },
      { name: '30', code: '30' },
      { name: '32', code: '32' },
      { name: '34', code: '34' },
      { name: '36', code: '36' },
    ],
    colors: [
      { name: 'Blue', hex: '#0000FF' },
      { name: 'Black', hex: '#000000' },
    ],
    tags: ['jeans', 'denim', 'casual'],
    dateAdded: '2023-05-29',
  },
  {
    name: 'Summer Dress',
    description: 'A lightweight dress perfect for summer days.',
    price: '$34.99',
    image: 'https://source.unsplash.com/random?summer-dress',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Yellow', hex: '#FFFF00' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    tags: ['summer-dress', 'lightweight', 'comfortable'],
    dateAdded: '2023-05-30',
  },
  {
    name: 'Leather Belt',
    description: 'A durable leather belt to complete your outfit.',
    price: '$29.99',
    image: 'https://source.unsplash.com/random?belt',
    brand: 'FashionBrand',
    sizes: [
      { name: '28', code: '28' },
      { name: '30', code: '30' },
      { name: '32', code: '32' },
      { name: '34', code: '34' },
      { name: '36', code: '36' },
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#A52A2A' },
    ],
    tags: ['belt', 'leather', 'durable'],
    dateAdded: '2023-05-31',
  },
  {
    name: 'Sunglasses',
    description: 'Stylish sunglasses to protect your eyes from the sun.',
    price: '$19.99',
    image: 'https://source.unsplash.com/random?sunglasses',
    brand: 'FashionBrand',
    sizes: [],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#A52A2A' },
    ],
    tags: ['sunglasses', 'eyewear', 'protection'],
    dateAdded: '2023-06-01',
  },
  {
    name: 'Hooded Sweatshirt',
    description: 'A cozy hooded sweatshirt for chilly evenings.',
    price: '$44.99',
    image: 'https://source.unsplash.com/random?sweatshirt',
    brand: 'FashionBrand',
    sizes: [
      { name: 'small', code: 'S' },
      { name: 'medium', code: 'M' },
      { name: 'large', code: 'L' },
      { name: 'extra large', code: 'XL' },
    ],
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Blue', hex: '#0000FF' },
    ],
    tags: ['hooded-sweatshirt', 'cozy', 'chilly'],
    dateAdded: '2023-06-02',
  },
  {
    name: 'Canvas Sneakers',
    description: 'Casual canvas sneakers for everyday wear.',
    price: '$29.99',
    image: 'https://source.unsplash.com/random?sneakers',
    brand: 'FashionBrand',
    sizes: [
      { name: '5', code: '5' },
      { name: '6', code: '6' },
      { name: '7', code: '7' },
      { name: '8', code: '8' },
      { name: '9', code: '9' },
      { name: '10', code: '10' },
      { name: '11', code: '11' },
      { name: '12', code: '12' },
    ],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' },
      { name: 'Blue', hex: '#0000FF' },
    ],
    tags: ['sneakers', 'canvas', 'casual'],
    dateAdded: '2023-06-03',
  },
  {
    name: 'Leather Wallet',
    description: 'A stylish leather wallet for keeping your essentials organized.',
    price: '$39.99',
    image: 'https://source.unsplash.com/random?wallet',
    brand: 'FashionBrand',
    sizes: [],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#A52A2A' },
    ],
    tags: ['wallet', 'leather', 'stylish'],
    dateAdded: '2023-06-04',
  }
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const Home = () => {
  const [visibleItems, setVisibleItems] = useState(8);

  const handleShowMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 4); // Show 4 more items
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainBanner post={mainBanner} />
          <Divider sx={{ my: 6, bgcolor: 'grey.400' }} />
          <Grid container spacing={4}>
            {featuredProducts.slice(0, visibleItems).map((product) => (
              <FeaturedProduct key={product.name} product={product} />
            ))}
          </Grid>
          {visibleItems < featuredProducts.length && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
              <Button
                variant="contained"
                onClick={handleShowMore}
                sx={{
                  backgroundColor: 'grey.400', // Set background color
                  color: '#ffffff', // Set text color
                  borderRadius: '1.5rem', // Round the corners
                  padding: '0.8rem 2.5rem', // Add padding
                  boxShadow: 'none', // Remove box shadow
                  '&:hover': {
                    backgroundColor: 'grey.900', // Darken background color on hover
                  },
                }}
              >
                SHOW MORE
              </Button>
            </div>
          )}
          <div style={{ height: '6rem' }} /> {/* Adjust the height as needed */}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export default Home;
