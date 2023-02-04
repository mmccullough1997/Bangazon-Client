/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import { Chip } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/orders/OrderCard';
import { useAuth } from '../../utils/context/authContext';
import { getOrdersByCustomer } from '../../utils/data/orderData';
import { getProductOrders } from '../../utils/data/productOrderData';

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [productOrdersSold, setProductOrdersSold] = useState([]);

  const getSellerProductOrders = () => {
    getProductOrders().then((productOrdersArray) => {
      const sellerProductOrders = productOrdersArray.filter((productOrder) => productOrder.product.seller.id === user.id);
      setProductOrdersSold(sellerProductOrders);
    });
  };

  const handleClick = (event) => {
    const val = event.target.innerHTML;
    if (val === 'Purchased') {
      setProductOrdersSold([]);
      getOrdersByCustomer(user.id).then(setOrders);
    } else if (val === 'Sold') {
      setOrders([]);
      getSellerProductOrders();
    } else {
      getOrdersByCustomer(user.id).then(setOrders);
      getSellerProductOrders();
    }
  };

  useEffect(() => {
    getOrdersByCustomer(user.id).then(setOrders);
    getSellerProductOrders();
  }, []);

  return (
    <div>
      <div>
        <Stack direction="row" spacing={1}>
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Purchased" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="Sold" onClick={handleClick} />
          <Chip style={{ backgroundColor: 'grey', color: 'white' }} label="All" onClick={handleClick} />
        </Stack>
      </div>
      {orders.map((order) => (
        <OrderCard orderId={order.id} datePlaced={order.date_placed} productOrders={order.product_orders_on_order} cost={order.cost} />
      ))}
      {productOrdersSold.map((productOrder) => (
        <OrderCard orderId={productOrder?.order?.id} datePlaced={productOrder?.order?.date_placed} productOrders={[productOrder]} cost={productOrder?.order.cost} />
      ))}
    </div>
  );
}
