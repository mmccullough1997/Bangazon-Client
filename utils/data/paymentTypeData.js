import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getPaymentTypesByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/paymenttypes?customer=${customerId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const getSinglePaymentType = (paymentTypeId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/paymenttypes/${paymentTypeId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: Number(data.id),
        accountNumber: data.account_number,
        label: data.label,
        customer: data.customer,
      });
    }).catch((error) => reject(error));
});

const updatePaymentType = (user, paymentType, paymentTypeId) => new Promise((resolve, reject) => {
  const paymentTypeObj = {
    account_number: paymentType.accountNumber,
    label: paymentType.label,
    customer: user.id,
  };
  fetch(`${dbUrl}/paymenttypes/${paymentTypeId}`, {
    method: 'PUT',
    body: JSON.stringify(paymentTypeObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createPaymentType = (paymentType, user) => new Promise((resolve, reject) => {
  const paymentTypeObj = {
    account_number: paymentType.accountNumber,
    label: paymentType.label,
    customer: user.id,
  };
  fetch(`${dbUrl}/paymenttypes`, {
    method: 'POST',
    body: JSON.stringify(paymentTypeObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export {
  getPaymentTypesByCustomer, getSinglePaymentType, updatePaymentType, createPaymentType,
};
