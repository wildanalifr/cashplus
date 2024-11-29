'use client'

import { CartProvider } from './CartContext'
import { LikeProductProvider } from './LikeProductContext'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <CartProvider>
      <LikeProductProvider>{children}</LikeProductProvider>
    </CartProvider>
  )
}

export default Providers
