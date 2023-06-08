import React, { useState, useContext } from 'react';
import './cart.css';
import { ShopContext, ShopContextValue } from '../../context/shop-context';

interface CartItemProps {
    data: any;
    quantity: number;
    handleRemoveFromCart: (itemId: string) => void; // Add this line
    handleUpdateCartItemCount: (itemId: string, newQuantity: number) => void;
  }
  
  export const CartItem: React.FC<CartItemProps> = ({
    data,
    quantity,
    handleRemoveFromCart,
    handleUpdateCartItemCount,
  }) => {
    const { Code, Description, Cost, OM } = data;
    const [itemQuantity, setItemQuantity] = useState(quantity);
  
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuantity = parseInt(e.target.value);
      setItemQuantity(newQuantity);
      handleUpdateCartItemCount(Code, newQuantity);
    };
  
    const handleRemoveItemClick = () => {
      handleRemoveFromCart(Code); // Call handleRemoveFromCart with the item's Code
    };
 
  return (
    <div className="cart-item">
      <h3>{Description}</h3>
      <p>
        <span>Cost: {Cost} | | </span>
        <span>OM: {OM} | | </span>
        <span>Code: {Code}</span>
      </p>
      <div className="quantity-control">
        <button
          className="quantity-btn"
          onClick={() => handleUpdateCartItemCount(Code, quantity - 1)}
          disabled={quantity < 1}
        >
          -
        </button>
        <input
          className="quantity-input"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <button
          className="quantity-btn"
          onClick={() => handleUpdateCartItemCount(Code, quantity + 1)}
        >
          +
        </button>
      </div>
      <button className="remove-btn" onClick={handleRemoveItemClick}>
        Remove
      </button>
    </div>
  );
};