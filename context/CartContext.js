"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item) => {
    const itemId = generateCartItemId(item);
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === itemId);

      if (existingItem) {
        return prevCart.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, id: itemId, quantity: 1 }];
      }
    });
  };

  const updateProductQuantity = (item, delta) => {
    const itemId = item.id;
    setCart((prevCart) => {
      const updated = prevCart.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity + delta } : i
      );
      return updated.filter((i) => i.quantity > 0);
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const generateCartItemId = (item) => {
    return JSON.stringify({
      _id: item._id,
      isCustom: item.isCustom || false,
      description: item.custom?.description || "",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateProductQuantity,
        removeFromCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
