import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import MinimalProductCard from '../components/products/MinimalProductCard';
import { getCustomers } from '../utils/data/customerData';
import { getProducts } from '../utils/data/productData';

export default function SearchPage() {
  const router = useRouter();
  const [filteredData, setFilteredData] = useState([]);

  const getTheProducts = () => {
    getProducts().then((productsArr) => {
      getCustomers().then((customerArr) => {
        const megaArr = [...productsArr, ...customerArr];
        const value = router.query.keyword;
        setFilteredData(megaArr);
        const results = megaArr.filter((object) => object?.title?.toLowerCase().includes(value.toLowerCase() || object?.first_name.toLowerCase().includes(value.toLowerCase())));
        setFilteredData(results);
      });
    });
  };

  useEffect(() => {
    getTheProducts();
    setFilteredData([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.keyword]);

  return (
    <>
      <h1><u>Search Results</u></h1>
      <h2 className="searchPageSubheader">You searched for...{router.query.keyword}</h2>
      <div>
        {filteredData.length ? filteredData.map((product) => (
          <>
            <MinimalProductCard image={product?.image} title={product?.title} cost={product?.cost} productId={product?.id} />
          </>
        )) : <h2>No Results Found.</h2>}
      </div>
    </>
  );
}
