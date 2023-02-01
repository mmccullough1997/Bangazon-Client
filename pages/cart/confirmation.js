/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import MinimalProductCard from '../../components/products/MinimalProductCard';
import { useAuth } from '../../utils/context/authContext';
import { getProductOrdersByCustomer } from '../../utils/data/productOrderData';

export default function CartConfirmation() {
  const [productOrder, setProductOrder] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getProductOrdersByCustomer(user.id).then((resp) => {
      setProductOrder(resp.slice(-1).pop());
    });
  }, []);

  return (
    <>
      <div>
        <h1>Added to Cart!</h1>
        <MinimalProductCard image={productOrder?.product?.image} title={productOrder?.product?.title} cost={productOrder?.product?.cost} productId={productOrder?.product?.id} />
        <h1>Seller: {productOrder?.product?.seller?.first_name} {productOrder?.product?.seller?.last_name}</h1>
        <h1>Quantity: {productOrder?.quantity}</h1>
      </div>
      <div>
        <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        <Button onClick={() => router.push('/cart/myCart')}>Go to Cart</Button>
      </div>
    </>
  );
}
