import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getPaymentTypesByCustomer = (customerId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/paymenttypes?customer=${customerId}`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getPaymentTypesByCustomer;
