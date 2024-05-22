import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

function FeaturedProduct(props) {
  const { product } = props;
  console.log(props);
  return (
    <Grid item xs={12} md={3}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ height: 350, margin: 'auto', alignItems: 'center', justifyContent: 'center', display: { xs: 'none', sm: 'block' }}}
            image={product.image}
            alt={product.imageLabel}
          />
        </Card>
      </CardActionArea>
      <Typography component="h1" variant="h5" sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>
        {product.price}
      </Typography>
      <Typography component="h1" variant="h5" sx={{ marginTop: 'auto', textAlign: 'center'}}>
        {product.name}
      </Typography>
    </Grid>
  );
}

FeaturedProduct.propTypes = {
  product: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};



export default FeaturedProduct;