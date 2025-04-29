import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);


  


  return (
    <CartContext.Provider value={{ cart,setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart
export const useCart = () => useContext(CartContext);
