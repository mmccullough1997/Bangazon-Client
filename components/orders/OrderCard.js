/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MinimalProductCard from '../products/MinimalProductCard';

export default function OrderCard({
  orderId, datePlaced, productOrders, cost,
}) {
  const [reducedProductOrders, setReducedProductOrders] = useState([]);

  const reduceProductOrders = (theProductOrders) => {
    if (theProductOrders.length) {
      const reducedArr = theProductOrders?.reduce((acc, cur) => {
        if (acc[cur.product.id]) {
          acc[cur.product.id].quantity += cur.quantity;
          acc[cur.product.id].subtotal += cur.subtotal;
        } else {
          acc[cur.product.id] = cur;
        }
        return acc;
      }, {});
      const result = Object.values(reducedArr);
      return result;
    }
    return theProductOrders;
  };

  useEffect(() => {
    setReducedProductOrders(reduceProductOrders(productOrders));
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>
          <div>
            <h1>Order Id: {orderId}</h1>
            <h1>Order Placed: {datePlaced}</h1>
          </div>
        </Card.Header>
        <Card.Body>
          {reducedProductOrders?.map((productOrder) => (
            <MinimalProductCard image={productOrder?.product?.image} title={productOrder?.product?.title} cost={productOrder?.product?.cost} productId={productOrder?.product?.id} />
          ))}
        </Card.Body>
        <Card.Footer>
          <div>
            <h1>Total Cost: ${cost}</h1>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

OrderCard.propTypes = {
  orderId: PropTypes.number.isRequired,
  datePlaced: PropTypes.string.isRequired,
  productOrders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    product: PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      cost: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      quantity: PropTypes.number,
      seller: PropTypes.shape({
        id: PropTypes.number,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        image: PropTypes.string,
      }),
      product_type: PropTypes.shape({
        label: PropTypes.string,
      }),
    }),
    customer: PropTypes.number,
    quantity: PropTypes.number,
  })),
  cost: PropTypes.string.isRequired,
};
