/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import RegisterForm from '../../../components/customers/RegisterForm';
import { getSingleCustomer } from '../../../utils/data/customerData';

export default function EditProfile() {
  const [customer, setCustomer] = useState({});
  const router = useRouter();
  const { customerId } = router.query;

  const getTheCustomer = () => {
    getSingleCustomer(customerId).then(setCustomer);
  };

  useEffect(() => {
    getTheCustomer();
  }, [router]);

  return (
    <RegisterForm user={customer} onUpdate={getTheCustomer} />
  );
}
