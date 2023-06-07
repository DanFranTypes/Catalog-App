import React, { ReactNode, createContext, useEffect, useState } from "react";

type CartItems = { [itemId: string]: number };

export interface ShopContextValue {
  cartItems: { [itemId: string]: number };
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getTotalCartAmount: () => number;
  catalogData: any[];
  setCatalogData: React.Dispatch<React.SetStateAction<any[]>>;
  setCartItems: React.Dispatch<React.SetStateAction<{ [itemId: string]: number }>>;
}

export const ShopContext = createContext<ShopContextValue>(
  {} as ShopContextValue
);

const getDefaultCart = (): CartItems => {
  return {};
};

interface ShopContextProviderProps {
  children: ReactNode;
}

export const ShopContextProvider = ({
  children,
}: ShopContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItems>(getDefaultCart());
  const [catalogData, setCatalogData] = useState<any[]>([]); // Add catalogData state

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = catalogData.find((product) => product.Code === item);
        totalAmount += cartItems[item] * (itemInfo?.Cost ?? 0);
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const fetchCatalogData = async () => {
    try {
      const response = await fetch('/catalog.json');
      const data = await response.json();
      setCatalogData(data);
    } catch (error) {
      console.error('Error fetching catalog data:', error);
    }
  };

  // Fetch the catalog data when the component mounts
  useEffect(() => {
    fetchCatalogData();
  }, []);

  const contextValue: ShopContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    catalogData,
    setCatalogData,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
