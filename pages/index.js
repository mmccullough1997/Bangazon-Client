import { useEffect, useState } from 'react';
import MinimalProductCard from '../components/products/MinimalProductCard';
import getProducts from '../utils/data/productData';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      {products.map((product) => (
        <MinimalProductCard key={product.id} image={product.image} title={product.title} cost={product.cost} productId={product.id} />
      ))}
    </div>
  );
}

export default Home;
