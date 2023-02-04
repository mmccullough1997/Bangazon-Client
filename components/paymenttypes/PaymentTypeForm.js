/* eslint-disable react/require-default-props */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { createPaymentType, updatePaymentType } from '../../utils/data/paymentTypeData';

const initialPaymentType = {
  label: '',
  accountNumber: '',
};

function PaymentTypeForm({ paymentType, customerId }) {
  const [formData, setFormData] = useState(initialPaymentType);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (paymentType.id) {
      setFormData(paymentType);
    }
  }, [paymentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentType.id) {
      updatePaymentType(user, formData, paymentType.id);
      router.push(`/customers/${customerId}`);
    } else {
      createPaymentType(formData, user).then(() => router.push(`/customers/${customerId}`));
    }
  };

  return (
    <>
      <h1>{user.id ? 'Edit Payment Type' : 'Create Payment Type'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Control name="label" placeholder="Account Name" required value={formData.label} onChange={handleChange} />

          <Form.Control name="accountNumber" placeholder="Account Number" required value={formData.accountNumber} onChange={handleChange} />

        </Form.Group>
        <Button variant="primary" type="submit">
          {user.id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

PaymentTypeForm.propTypes = {
  paymentType: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    accountNumber: PropTypes.number,
  }),
  customerId: PropTypes.number,
};

PaymentTypeForm.defaultProps = {
  paymentType: initialPaymentType,
};

export default PaymentTypeForm;
