import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';

const Product: React.FC<{ product: any }> = ({ product }) => {
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemAmount = cartItems[product.Code] || 0;
  const handleAddToCart = () => {
    addToCart(product.Code);
  };

  return (
    <div className="product">
      <h3>{product.Description}</h3>
      <p>
        <span>Cost: {product.Cost} | | </span>
        <span>OM: {product.OM} | | </span>
        <span>Code: {product.Code}</span>
      </p>
      <button className="addToCartBtn" onClick={handleAddToCart}>
        Add To Cart {cartItemAmount > 0 && `(${cartItemAmount})`}
      </button>
    </div>
  );
};

export default Product;
