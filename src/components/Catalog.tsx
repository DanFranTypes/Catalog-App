import React, { useContext, useEffect } from 'react';
import './catalog.css';
import { ShopContext, ShopContextValue } from '../context/shop-context';

const Catalog: React.FC = () => {
  const { addToCart, cartItems, catalogData, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    // Fetch the catalog data from the file
    const fetchCatalogData = async () => {
      try {
        const response = await fetch('/catalog.json');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };

    fetchCatalogData();
  }, [setCartItems]);


  return (
    <div className='catalog'>
      <h1>Catalog</h1>
      {catalogData.map((item: any) => {
        const cartItemAmount = cartItems[item.Code] || 0;
        const { Code, Description, Cost, OM } = item;

        return (
          <div key={Code}>
            {item.Cost ? (
              <div>
                <h3>{Description}</h3>
                <p>
                  <span>Cost: {Cost} | | </span>
                  <span>OM: {OM} | | </span>
                  <span>Code: {Code}</span>
                </p>
                <button className='addToCartBttn' onClick={() => addToCart(Code)}>
                  Add To Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
                </button>
              </div>
            ) : (
              <p style={{ fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline' }}>
                {Description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Catalog;
