import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getProductOrders = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/productorders`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createProductOrder = (productOrderObj, user) => new Promise((resolve, reject) => {
  const productOrder = {
    product: productOrderObj.product,
    quantity: productOrderObj.quantity,
    customer: user.id,
  };
  fetch(`${dbUrl}/productorders`, {
    method: 'POST',
    body: JSON.stringify(productOrder),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export { getProductOrders, createProductOrder };
