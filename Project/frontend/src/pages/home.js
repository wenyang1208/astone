import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/header";
import MainBanner from "../components/mainBanner";
import FeaturedProduct from "../components/featuredProduct";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer2";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PathConstants from "../routes/pathConstants";
import { ProductService } from "../services/ProductService";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyAppBar from "../components/appBar";

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
  title: "SALE!",
  description: "Up to 30% off!",
  image: "https://source.unsplash.com/random?clothing",
  imageText: "main image description",
  linkText: "See for yourself!",
};

const Home = () => {
  const BASE_URL = "http://localhost:8000";

  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    const productService = new ProductService();

    // Call the getProducts method from ProductService
    productService
      .getProducts()
      .then((res) => {
        // Filter products for men
        // const menProducts = res.data.filter(product => product.category.toLowerCase() === "men" || product.category.toLowerCase() === "men's");
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 4); // Show 4 more items
  };

  const handleCardClick = (id) => {
    navigate(`/buyer_products/${id}/`);
  };

  const ProductCard = ({ product }) => (
    <Card style={styles.card} onClick={() => handleCardClick(product.id)}>
      <CardMedia
        style={styles.media}
        image={
          product.images.length > 0
            ? `${BASE_URL}${product.images[0].image_url}`
            : "https://via.placeholder.com/140"
        }
        title={product.name}
      />
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
        <Button variant="contained" color="primary" size="small">
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div>
      <MyAppBar></MyAppBar>
      <div style={styles.container}>
        <main style={styles.content}>
          <MainBanner post={mainBanner} />
          <Divider sx={{ my: 6, bgcolor: "grey.400" }} />
          {products == null ? (
            <Grid></Grid>
          ) : (
            <Grid container spacing={1}>
              {products.slice(0, visibleItems).map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
          {visibleItems < products.length && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                variant="contained"
                onClick={handleShowMore}
                sx={{
                  backgroundColor: "grey.400", // Set background color
                  color: "#ffffff", // Set text color
                  borderRadius: "1.5rem", // Round the corners
                  padding: "0.8rem 2.5rem", // Add padding
                  boxShadow: "none", // Remove box shadow
                  "&:hover": {
                    backgroundColor: "primary", // Darken background color on hover
                  },
                }}
              >
                SHOW MORE
              </Button>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    backgroundColor: "#f0f0f0",
    minHeight: "100vh",
  },
  sidebar: {
    width: "250px", // Fixed width for the sidebar
    flexShrink: 0,
    padding: "20px",
    backgroundColor: "#ffffff",
  },
  filter: {
    marginTop: "0",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  subHeading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    padding: "0",
  },
  listItem: {
    marginBottom: "10px",
  },
  checkbox: {
    marginRight: "10px",
  },
  section: {
    marginBottom: "20px",
  },
  content: {
    flexGrow: "1",
    padding: "20px",
  },
  card: {
    maxWidth: 345,
    margin: "20px",
    cursor: "pointer",
  },
  media: {
    height: 200, // Increased height
  },
  price: {
    color: "#ff0000", // Changed color to red
  },
};

export default Home;
