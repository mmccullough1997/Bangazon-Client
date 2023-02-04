import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import PaymentTypeForm from '../../../components/paymenttypes/PaymentTypeForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSinglePaymentType } from '../../../utils/data/paymentTypeData';

export default function EditPaymentType() {
  const { user } = useAuth();
  const router = useRouter();
  const { paymentTypeId } = router.query;
  const [paymentType, setPaymentType] = useState({});

  useEffect(() => {
    getSinglePaymentType(paymentTypeId).then(setPaymentType);
  }, [paymentTypeId]);

  return (
    <PaymentTypeForm paymentType={paymentType} customerId={user.id} />
  );
}
