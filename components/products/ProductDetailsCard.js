/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Avatar, Button as MuiButton } from '@mui/material';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { useAuth } from '../../utils/context/authContext';

function ProductDetailsCard({ product }) {
  // const { user } = useAuth();
  const router = useRouter();

  return (
    <>
      <Card>
        <Link passHref href={`../customers/${product?.seller?.id}`}>
          <Card.Header>
            Posted on by {product.seller?.first_name} {product.seller?.last_name}
          </Card.Header>
        </Link>
        <Card.Body>
          <div className="row">
            <div className="col-5">
              <Card.Img src={product?.image} />
            </div>
            <div className="col-6">
              <div>
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
          </div>
        </Card.Body>
      </Card>
      <hr />
    </>
  );
}

ProductDetailsCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    cost: PropTypes.number,
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
