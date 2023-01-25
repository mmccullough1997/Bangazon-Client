/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import ProductOrderCard from '../../components/products/ProductOrderCard';
import { getProductOrders } from '../../utils/data/productOrderData';

export default function myCart() {
  const [productOrders, setProductOrders] = useState([]);

  useEffect(() => {
    getProductOrders().then((res) => {
      setProductOrders(res);
    });
  }, []);

  return (
    <div>
      <h1>My Shopping Cart</h1>
      <ProductOrderCard productOrders={productOrders} />
    </div>
  );
}
