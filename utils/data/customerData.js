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

export default updateCustomer;
