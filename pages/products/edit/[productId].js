import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ProductForm from '../../../components/products/ProductForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleProduct } from '../../../utils/data/productData';

export default function EditProduct() {
  const { user } = useAuth();
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState({});

  useEffect(() => {
    getSingleProduct(productId).then(setProduct);
  }, [productId]);

  console.warn(product);

  return (
    <ProductForm productObj={product} user={user} />
  );
}
