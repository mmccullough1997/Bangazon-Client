import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getProductTypes = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/producttypes`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

export default getProductTypes;
