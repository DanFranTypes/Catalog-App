import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';

interface CartItemProps {
    data: {
      Code: string;
      Description: string;
      Cost: number;
      ProductImage: string;
    };
    quantity: number;
    handleAddToCart: (itemId: string) => void;
    handleRemoveFromCart: (itemId: string) => void;
    handleUpdateCartItemCount: (itemId: string, newQuantity: number) => void;
  }
  

export const CartItem = (props: CartItemProps) => {
  const { Code, Description, Cost, ProductImage } = props.data;
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  return (
    <div className='cartItem'>
      <img src={ProductImage} alt='Product' />
      <div className='description'>
        <p>
          <b>{Description}</b>
        </p>
        <p>${Cost}</p>
        <div className='countHandler'>
          <button onClick={() => removeFromCart(Code)}> - </button>
          <input
            value={cartItems[Code]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), Code)}
          />
          <button onClick={() => addToCart(Code)}> + </button>
        </div>
      </div> 
    </div>
    );
};
