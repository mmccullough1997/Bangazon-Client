import React from 'react';
import PaymentTypeForm from '../../components/paymenttypes/PaymentTypeForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddPaymentType() {
  const { user } = useAuth();

  return (
    <PaymentTypeForm customerId={user.id} />
  );
}
