/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MinimalProductCard from '../components/products/MinimalProductCard';
import getProducts from '../utils/data/productData';
import ProductCarousel from '../components/products/ProductCarousel';

function Home() {
  const [products, setProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  const getShuffledProducts = () => {
    getProducts().then((productsArray) => {
      const shuffled = productsArray.sort(() => 0.5 - Math.random());
      setShuffledProducts(shuffled.slice(0, 3));
    });
  };
  useEffect(() => {
    getProducts().then(setProducts);
    getShuffledProducts();
  }, []);

  useEffect(() => {
    getShuffledProducts();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <ProductCarousel shuffledProducts={shuffledProducts} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {products.map((product) => (
            <Grid xs={2} sm={4} md={2.5} key={product.id}>
              <Item>
                <MinimalProductCard key={product.id} image={product.image} title={product.title} cost={product.cost} productId={product.id} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default Home;
