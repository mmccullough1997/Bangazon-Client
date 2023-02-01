/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { getProducts } from '../../utils/data/productData';
import getProductTypes from '../../utils/data/productTypeData';

export default function productTypesPage() {
  const [productTypes, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getProductTypes().then(setProductTypes);
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <Accordion defaultActiveKey="1">
        {productTypes.map((productType) => (
          <Accordion.Item eventKey={productType?.id}>
            <Accordion.Header>{productType?.label}</Accordion.Header>
            {products.filter((product) => product.product_type.id === productType.id).map((theProduct) => (
              <div>
                <Accordion.Body onClick={() => router.push(`/products/${theProduct.id}`)}>{theProduct.title}   ({theProduct.quantity})</Accordion.Body>
              </div>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
