/* eslint-disable import/prefer-default-export */
import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const updateCustomer = (customerObj, customerId) => new Promise((resolve, reject) => {
  const newCustomerObj = {
    first_name: customerObj.firstName,
    last_name: customerObj.lastName,
    bio: customerObj.bio,
    image: customerObj.image,
  };
  fetch(`${dbUrl}/customers/${customerId}`, {
    method: 'PUT',
    body: JSON.stringify(newCustomerObj),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resolve)
    .catch(reject);
});
const getSingleCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/customers/${customerId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        uid: data.uid,
        firstName: data.first_name,
        lastName: data.last_name,
        bio: data.bio,
        image: data.image,
        dateRegistered: data.date_registered,
      });
    }).catch((error) => reject(error));
});

const deleteCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/customers/${customerId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

const getCustomers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/customers`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  updateCustomer, getSingleCustomer, deleteCustomer, getCustomers,
};
