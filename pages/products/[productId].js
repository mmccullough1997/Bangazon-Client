/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductDetailsCard from '../../components/products/ProductDetailsCard';
import { getSingleProduct } from '../../utils/data/productData';

export default function productDetailPage() {
  const [product, setProduct] = useState({});
  const router = useRouter();
  const { productId } = router.query;

  const getTheProduct = () => {
    getSingleProduct(productId).then(setProduct);
  };

  useEffect(() => {
    getTheProduct();
  }, []);

  return (
    <div>
      <ProductDetailsCard product={product} />
    </div>
  );
}
