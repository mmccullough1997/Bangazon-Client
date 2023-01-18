import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getProducts;
