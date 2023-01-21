/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Avatar, Button as MuiButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
// import { useAuth } from '../../utils/context/authContext';

function ProductDetailsCard({ product }) {
  const router = useRouter();
  const [availableQuantity, setAvailableQuantity] = React.useState(1);
  const [desiredQuantity, setDesiredQuantity] = React.useState(1);

  const handleChange = (event) => {
    setDesiredQuantity(event.target.value);
  };

  useEffect(() => {
    setAvailableQuantity([...Array(product.quantity).keys()].map((i) => i + 1));
    console.warn('h');
  }, []);

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
            <FormControl>
              <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={desiredQuantity}
                label="Quantity"
                onChange={handleChange}
              >
                {availableQuantity.length
                  ? availableQuantity?.map((quantity) => (
                    <MenuItem value={quantity}>{quantity}</MenuItem>
                  ))
                  : <MenuItem value={availableQuantity[0]}>{availableQuantity[0]}</MenuItem>}
              </Select>
            </FormControl>
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
