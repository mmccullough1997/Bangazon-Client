// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import getProductTypes from '../../utils/data/productTypeData';

const initialProductState = {
  title: '',
  cost: 0,
  description: '',
  quantity: 0,
  image: '',
  productTypeId: null,
};

export default function ProductForm({ productObj, user }) {
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [productTypes, setProductTypes] = useState([]);
  const [desiredProductTypes, setDesiredProductTypes] = useState([]);
  // const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.warn('hello', user);
  };

  useEffect(() => {
    getProductTypes().then(setProductTypes);
  }, [productObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productTypeId') {
      setDesiredProductTypes(value);
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setCurrentProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <Form className="postForm" onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <TextField fullWidth name="title" label="Title" required value={currentProduct.title} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <TextField multiline label="Description" className="form-control" rows="5" name="description" required value={currentProduct.description} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <TextField type="number" label="Cost" className="form-control" rows="5" name="cost" required value={currentProduct.cost} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <TextField type="number" label="Quantity" className="form-control" rows="5" name="quantity" required value={currentProduct.quantity} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <TextField fullWidth label="Image URL" name="image" required value={currentProduct.image} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select onChange={handleChange} className="mb-3" name="productTypeId" value={desiredProductTypes} required>
            <option value="">Select a Product Type</option>
            {productTypes.map((productType) => (
              <option key={productType.id} value={productType.id}>
                {productType.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="outlined" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

ProductForm.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    quantity: PropTypes.number,
    cost: PropTypes.number,
    seller: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      image: PropTypes.string,
    }),
    productType: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

ProductForm.defaultProps = {
  productObj: initialProductState,
};
