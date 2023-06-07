import React, { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';

interface CartItemProps {
  data: {
    code: string;
    description: string;
    cost: number;
    productImage: string;
  };
}

export const CartItem = (props: CartItemProps) => {
  const { code, description, cost, productImage } = props.data;
  const { addToCart, cartItems, removeFromCart, updateCartItemCount } = useContext(ShopContext);

  return (
    <div className='cartItem'>
      <img src={productImage} alt='Product' />
      <div className='description'>
        <p>
          <b>{description}</b>
        </p>
        <p>${cost}</p>
        <div className='countHandler'>
          <button onClick={() => removeFromCart(code)}> - </button>
          <input
            value={cartItems[code]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), code)}
          />
          <button onClick={() => addToCart(code)}> + </button>
        </div>
      </div> 
    </div>
    );
};
