import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { getTotalCartAmount, catalogData, setCatalogData } = useContext(ShopContext);
  const [cartItems, setCartItems] = useState<{ [itemId: string]: number }>({});
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const navigate = useNavigate();

  const updateTotalCartAmount = () => {
    let totalAmount = 0;
    for (const [itemId, quantity] of Object.entries(cartItems)) {
      const item = catalogData.filter(product => product.code === itemId)[0];
      totalAmount += (quantity as number) * (item?.cost ?? 0);
    }
    setTotalCartAmount(totalAmount);
  };

  useEffect(() => {
    // Fetch the catalog data when the component mounts
    const fetchCatalogData = async () => {
      try {
        const response = await fetch('/catalog.json');
        const data = await response.json();
        setCatalogData(data);
        updateTotalCartAmount();
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };
    fetchCatalogData();
  }, []);

  const handleAddToCart = (itemId: string) => {
    const newCartItems = { ...cartItems, [itemId]: (cartItems[itemId] || 0) + 1 };
    setCartItems(newCartItems);
    updateTotalCartAmount();
  };

  const handleRemoveFromCart = (itemId: string) => {
    const newCartItems = { ...cartItems };
    delete newCartItems[itemId];
    setCartItems(newCartItems);
    updateTotalCartAmount();
  };

  const handleUpdateCartItemCount = (itemId: string, newQuantity: number) => {
    const newCartItems = { ...cartItems, [itemId]: newQuantity };
    setCartItems(newCartItems);
    updateTotalCartAmount();
  };

  return (
    <div className='cart'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className='cartItems'>
        {Object.keys(cartItems).map((productId: string) => {
          const quantity = cartItems[productId];
          if (quantity > 0) {
            const item = catalogData.filter(product => product.code === productId)[0];
            if (item) {
              return (
                <CartItem
                  key={item.code}
                  data={item}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleUpdateCartItemCount={handleUpdateCartItemCount}
                />
              );
            }
          }
          return null;
        })}
      </div>
      {totalCartAmount > 0 ? (
        <div className='checkout'>
          <p>Subtotal: ${totalCartAmount}</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
          <button>Checkout</button>
        </div>
      ) : (
        <h1>Your Cart is Empty</h1>
      )}
    </div>
  );
};

