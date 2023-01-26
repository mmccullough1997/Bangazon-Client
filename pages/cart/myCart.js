/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ProductOrderCard from '../../components/products/ProductOrderCard';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, getOrdersByCustomer } from '../../utils/data/orderData';
import getPaymentTypesByCustomer from '../../utils/data/paymentTypeData';
import { getProductOrdersByCustomer, updateProductOrder } from '../../utils/data/productOrderData';

export default function myCart() {
  const [productOrders, setProductOrders] = useState([]);
  const [availablePaymentTypes, setAvailablePaymentTypes] = useState([]);
  const [desiredPaymentType, setDesiredPaymentType] = useState([]);
  const [prevProductOrders, setPrevProductOrders] = useState([]);
  const [reducedCartProductOrders, setReducedCartProductOrders] = useState([]);
  const [prevReducedCartProductOrders, setPrevReducedCartProductOrders] = useState([]);
  const [total, setTotal] = useState();
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (event) => {
    const { value } = event.target;
    setDesiredPaymentType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      cost: total,
      paymentType: desiredPaymentType,
    };
    createOrder(order, user).then(() => {
      // router.push('/orders/orderConfirmation');
      getOrdersByCustomer(user.id).then((resp) => {
        productOrders.forEach((productOrder) => {
          updateProductOrder(user, productOrder, resp.slice(-1).pop());
        });
      });
      router.push('/orders/orderConfirmation');
    });
  };

  const reduceProductOrders = (theProductOrders) => {
    const reducedArr = theProductOrders.reduce((acc, cur) => {
      acc[cur.product.id] ? acc[cur.product.id].quantity += cur.quantity : acc[cur.product.id] = cur;
      return acc;
    }, {});
    const result = Object.values(reducedArr);
    return result;
  };

  useEffect(() => {
    getProductOrdersByCustomer(user.id).then((productOrder) => {
      const nullOrders = productOrder.filter((productOrderArray) => productOrderArray.order === null);
      setProductOrders(nullOrders);
    });
    getPaymentTypesByCustomer(user.id).then(setAvailablePaymentTypes);
  }, []);

  useEffect(() => {
    if (productOrders.length !== prevProductOrders.length) {
      setReducedCartProductOrders(reduceProductOrders(productOrders));
      setPrevProductOrders(productOrders);
    }
  }, [productOrders, prevProductOrders]);

  useEffect(() => {
    if (reducedCartProductOrders.length !== prevReducedCartProductOrders.length) {
      setTotal(Math.round((reducedCartProductOrders?.map((item) => item?.subtotal)?.reduce((prev, next) => prev + next)) * 100) / 100);
      setPrevReducedCartProductOrders(reducedCartProductOrders);
    }
  }, [reducedCartProductOrders, prevReducedCartProductOrders]);

  return (
    <div>
      <h1>My Shopping Cart</h1>
      {reducedCartProductOrders.length ? (
        <div>
          <ProductOrderCard productOrders={reducedCartProductOrders} />
          <h1>Total Cost: ${total}</h1>
        </div>
      ) : (
        <h1>Nothing in cart</h1>
      )}
      {reducedCartProductOrders.length < 1 ? (
        <div />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Select
            onChange={handleChange}
            name="paymentType"
            value={desiredPaymentType}
            required
          >
            <option
              value=""
            >
              Select Payment Type
            </option>
            {availablePaymentTypes.length
              ? availablePaymentTypes?.map((paymentType) => (
                <option key={paymentType.id} value={paymentType.id}>{paymentType.label}</option>
              ))
              : <option value={availablePaymentTypes[0].id}>{availablePaymentTypes[0].label}</option>}
          </Form.Select>

          <Button type="submit">
            Submit Order
          </Button>
        </Form>

      )}
    </div>
  );
}
