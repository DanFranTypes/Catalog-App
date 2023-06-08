import React, { ReactNode, createContext, useEffect, useState } from 'react';

type CartItems = { [itemId: string]: number };

export interface ShopContextValue {
  cartItems: CartItems;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (itemId: string, newQuantity: number) => void;
  catalogData: any[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
}

export const ShopContext = createContext<ShopContextValue>({} as ShopContextValue);

const getDefaultCart = (): CartItems => ({});

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItems>(getDefaultCart());
  const [catalogData, setCatalogData] = useState<any[]>([]);

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      delete updatedCartItems[itemId]; // Remove the item directly from the cart
      return updatedCartItems;
    });
  };

  const updateCartItemCount = (itemId: string, newQuantity: number) => {
    setCartItems((prev) => {
      const updatedCartItems = { ...prev };
      if (newQuantity > 0) {
        updatedCartItems[itemId] = newQuantity;
      } else {
        delete updatedCartItems[itemId];
      }
      return updatedCartItems;
    });
  };
  

  useEffect(() => {
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

  const contextValue: ShopContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    catalogData,
    setCartItems,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};
