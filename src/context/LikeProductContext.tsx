'use client'

import { tProduct } from '@/types/product'
import React, { createContext, useState, useContext, ReactNode } from 'react'

// Define the type for the Cart Context
interface LikeProductContextType {
  likeProducts: tProduct[]
  addToLikeProduct: (product: tProduct) => void
  removeToLikeProduct: (productId: number) => void
  clearLikeProduct: () => void
}

const LikeProductContext = createContext<LikeProductContextType>({
  likeProducts: [],
  addToLikeProduct: () => {},
  removeToLikeProduct: () => {},
  clearLikeProduct: () => {},
})

// Define a type for children passed to the provider
interface LikeProductProviderProps {
  children: ReactNode
}

export const LikeProductProvider: React.FC<LikeProductProviderProps> = ({
  children,
}) => {
  const [likeProducts, setLikeProduct] = useState<tProduct[]>([])

  const addToLikeProduct = (product: tProduct) => {
    setLikeProduct((prev) => [...prev, product])
  }

  const removeToLikeProduct = (productId: number) => {
    setLikeProduct((prev) => prev.filter((item) => item.id !== productId))
  }

  // Clear cart
  const clearLikeProduct = () => setLikeProduct([])

  return (
    <LikeProductContext.Provider
      value={{
        likeProducts,
        addToLikeProduct,
        removeToLikeProduct,
        clearLikeProduct,
      }}
    >
      {children}
    </LikeProductContext.Provider>
  )
}

// Custom hook to use the LikeProductContext
export const useLikeProduct = () => useContext(LikeProductContext)
