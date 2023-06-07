import React, { useContext, useEffect } from 'react';
import './catalog.css';
import { ShopContext } from '../context/shop-context';

const Catalog: React.FC = () => {
  const { addToCart, cartItems, catalogData, setCatalogData } = useContext(ShopContext);

  useEffect(() => {
    // Fetch the catalog data from the file
    const fetchCatalogData = async () => {
      try {
        const response = await fetch('/catalog.json');
        const data = await response.json();
        setCatalogData(data);
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };

    fetchCatalogData();
  }, [setCatalogData]);

  const handleAddToCart = (item: any) => {
    addToCart(item.Code);
  };

  return (
    <div className='catalog'>
      <h1>Catalog</h1>
      {catalogData.map((item) => (
        <div key={item.Code}>
          {item.Cost ? (
            <div>
              <h3>{item.Description}</h3>
              <p>
                <span>Cost: {item.Cost} | | </span>
                <span>OM: {item.OM} | | </span>
                <span>Code: {item.Code}</span>
              </p>
              <button className='addToCartBttn' onClick={() => handleAddToCart(item)}>
                Add To Cart
              </button>
            </div>
          ) : (
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline' }}>
              {item.Description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Catalog;
