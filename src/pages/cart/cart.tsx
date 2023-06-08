import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import { CartItem } from './cart-item';
import './cart.css';

export const Cart: React.FC = () => {
    const { cartItems, catalogData, removeFromCart, updateCartItemCount } = useContext(ShopContext);
  
    
    const handleRemoveFromCart = (itemId: string) => {
      removeFromCart(itemId);
    };
  
    const handleUpdateCartItemCount = (itemId: string, newQuantity: number) => {
      updateCartItemCount(itemId, newQuantity);
    };
  
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
          cartItemsList
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    );
  };