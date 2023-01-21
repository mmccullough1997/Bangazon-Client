import { clientCredentials } from '../client';

const dbUrl = clientCredentials.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products`).then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProduct = (productId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/products/${productId}`).then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        title: data.title,
        cost: data.cost,
        description: data.description,
        quantity: data.quantity,
        image: data.image,
        productType: data.product_type,
        seller: data.seller,
      });
    }).catch((error) => reject(error));
});

export { getProducts, getSingleProduct };
