import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { cartItems, getTotalCartAmount, catalogData, setCatalogData } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

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
  }, []);

  return (
    <div className='cart'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className='cartItems'>
        {Object.keys(cartItems).map((productId: string) => {
          const quantity = cartItems[productId];
          if (quantity > 0) {
            const item = catalogData.find((product: any) => product.code === productId);
            if (item) {
              return <CartItem key={item.code} data={item} />;
            }
          }
          return null;
        })}
      </div>
      {totalAmount > 0 ? (
        <div className='checkout'>
          <p>Subtotal: ${totalAmount}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};
