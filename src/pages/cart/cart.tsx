import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css';

export const Cart: React.FC = () => {
    const { cartItems, catalogData, removeFromCart, updateCartItemCount } = useContext(ShopContext);
    const [totalCost, setTotalCost] = useState(0);

    
    const handleRemoveFromCart = (itemId: string) => {
      removeFromCart(itemId);
    };
  
    const handleUpdateCartItemCount = (itemId: string, newQuantity: number) => {
      updateCartItemCount(itemId, newQuantity);
    };

    useEffect(() => {
        let cost = 0;
        Object.entries(cartItems).forEach(([itemId, quantity]) => {
          const item = catalogData.find((item) => item.Code === itemId);
          if (item) {
            const itemCost = parseFloat(item.Cost.replace('$', '').trim());
            cost += itemCost * quantity;
          }
        });
        setTotalCost(cost);
      }, [cartItems, catalogData]);
  
    const cartItemsList = Object.keys(cartItems).map((itemId) => {
      const item = catalogData.find((item) => item.Code === itemId);
      const quantity = cartItems[itemId];
      if (item) {
        return (
          <CartItem
            key={item.Code}
            data={item}
            quantity={quantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleUpdateCartItemCount={handleUpdateCartItemCount}
          />
        );
      }
      return null;
    });
  
    return (
      <div className="cart">
        <h1>Cart</h1>
        {cartItemsList.length > 0 ? (
        <>
          {cartItemsList}
          <div className="total-cost">
            <p>Total Cost: ${totalCost.toFixed(2)}</p>
            <button className="checkout-btn">Checkout</button>
          </div>
        </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    );
  };