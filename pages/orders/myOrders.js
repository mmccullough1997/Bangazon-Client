/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/orders/OrderCard';
import { useAuth } from '../../utils/context/authContext';
import { getOrdersByCustomer } from '../../utils/data/orderData';

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrdersByCustomer(user.id).then(setOrders);
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <OrderCard orderId={order.id} datePlaced={order.date_placed} productOrders={order.product_orders_on_order} cost={order.cost} />
      ))}
    </div>
  );
}
