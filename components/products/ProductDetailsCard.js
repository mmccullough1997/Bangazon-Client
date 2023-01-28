/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form } from 'react-bootstrap';
import { Avatar, Button as MuiButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createProductOrder } from '../../utils/data/productOrderData';
import { deleteProduct, updateProduct } from '../../utils/data/productData';

function ProductDetailsCard({ product }) {
  const router = useRouter();
  const { user } = useAuth();
  const [availableQuantity, setAvailableQuantity] = React.useState(1);
  const [desiredQuantity, setDesiredQuantity] = React.useState(1);

  const deleteThisProduct = () => {
    if (window.confirm(`Are you sure you want to delete ${product.title}?`)) {
      deleteProduct(product.id).then(() => {
        router.push('/');
      });
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setDesiredQuantity(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productOrderObj = {
      product: product.id,
      quantity: desiredQuantity,
    };
    createProductOrder(productOrderObj, user).then(() => {
      const productObj = product;
      productObj.quantity -= desiredQuantity;
      updateProduct(productObj, productObj.id);
      router.push('/cart/myCart');
    });
  };

  useEffect(() => {
    setAvailableQuantity([...Array(product.quantity).keys()].map((i) => i + 1));
  }, [product]);

  return (
    <>
      <Card>
        <Card.Body>
          <div className="row">
            <div>
              <Card.Img src={product?.image} className="productDetailImage d-block mx-auto" />
            </div>
            <hr />
            <div className="col-6">
              <div className="productDetailCardTitle">
                <Card.Title><b>{product?.title}</b></Card.Title>
                <MuiButton onClick={() => router.push(`/customers/${product.seller?.id}`)}>
                  <p>{product.seller?.first_name} {product.seller?.last_name} </p>
                  <Avatar alt={product.seller?.last_name} src={product.seller?.image} />
                </MuiButton>
              </div>

              <Card.Text>${product.cost}</Card.Text>
              <Card.Text>Qty. Available: {product.quantity}</Card.Text>
              <Card.Text><b>About this Item:</b></Card.Text>
              <Card.Text>{product?.description}</Card.Text>
              <Card.Text>{product.productType?.label}</Card.Text>
            </div>
            {product.quantity < 1 ? (
              <div>Out of Stock</div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Select
                  onChange={handleChange}
                  name="quantity"
                  value={desiredQuantity}
                  required
                >
                  <option
                    value=""
                  >
                    Quantity
                  </option>
                  {availableQuantity.length
                    ? availableQuantity?.map((quantity) => (
                      <option key={quantity} value={quantity}>{quantity}</option>
                    ))
                    : <option value={availableQuantity[0]}>{availableQuantity[0]}</option>}
                </Form.Select>

                { user.id === product?.seller?.id ? (
                  <>
                    <div>Cannot add own item to cart</div>
                    <Button variant="link" startIcon={<EditIcon />} onClick={() => router.push(`/products/edit/${product.id}`)}>Edit Product</Button>
                    <Button variant="link" startIcon={<DeleteIcon />} onClick={() => deleteThisProduct(product.id)}>
                      DELETE
                    </Button>
                  </>

                ) : (
                  <Button type="submit">
                    Add to Cart
                  </Button>
                )}
              </Form>

            )}

          </div>
        </Card.Body>
      </Card>
    </>
  );
}

ProductDetailsCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.string,
    quantity: PropTypes.number,
    seller: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      image: PropTypes.string,
    }),
    productType: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetailsCard;
