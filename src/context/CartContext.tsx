'use client'

import { tProduct } from '@/types/product'
import React, { createContext, useState, useContext, ReactNode } from 'react'

// Define the type for the Cart Context
interface CartContextType {
  cart: tProduct[]
  addToCart: (product: tProduct) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

// Default context values (to prevent TypeScript errors)
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

// Define a type for children passed to the provider
interface CartProviderProps {
  children: ReactNode
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<tProduct[]>([])

  // Add product to cart
  const addToCart = (product: tProduct) => {
    // const newAddData = cart.filter((item)=> item.id === product.id)

    // if(newAddData){

    // }

    setCart((prev) => [...prev, product])
  }

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  // Clear cart
  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext)
