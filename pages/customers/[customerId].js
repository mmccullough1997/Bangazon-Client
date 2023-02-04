/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Button } from 'react-bootstrap';
import CustomerCard from '../../components/customers/CustomerCard';
import { getSingleCustomer } from '../../utils/data/customerData';
import { getProductsBySeller } from '../../utils/data/productData';
import MinimalProductCard from '../../components/products/MinimalProductCard';
import { getPaymentTypesByCustomer } from '../../utils/data/paymentTypeData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewSingleCustomer() {
  const [customer, setCustomer] = useState({});
  const [products, setProducts] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { customerId } = router.query;

  const getTheCustomer = () => {
    getSingleCustomer(customerId).then(setCustomer);
    getProductsBySeller(customerId).then(setProducts);
    getPaymentTypesByCustomer(customerId).then(setPaymentTypes);
  };

  useEffect(() => {
    getTheCustomer();
  }, [router]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <div>
        <CustomerCard userId={customer.id} userUid={customer.uid} firstName={customer.firstName} lastName={customer.lastName} dateRegistered={customer.dateRegistered} image={customer.image} bio={customer.bio} />
      </div>
      { user.id === Number(customerId) ? (
        <div>
          <div>
            Payment Types
            <AddIcon onClick={() => router.push('/paymenttypes/new')} />
          </div>
          {paymentTypes.map((paymentType) => (
            <Button key={paymentType.id} onClick={() => router.push(`/paymenttypes/edit/${paymentType.id}`)}>{paymentType.label}</Button>
          ))}
        </div>
      ) : (
        <div />
      )}
      <hr />
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {products.map((product) => (
              <Grid xs={2} sm={4} md={2.5} key={product.id}>
                <Item>
                  <MinimalProductCard key={product.id} image={product.image} title={product.title} cost={product.cost} productId={product.id} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
}
