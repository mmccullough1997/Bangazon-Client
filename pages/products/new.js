import React from 'react';
import ProductForm from '../../components/products/ProductForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddProduct() {
  const { user } = useAuth();

  return (
    <ProductForm user={user} />
  );
}
