'use client'

import { useQuery } from '@tanstack/react-query'
import ProductCartCard from '@/components/ProductCartCard'
import { tCart, tProduct } from '@/types/product'
import { use, useState } from 'react'
import ModalConfirmPay from '@/components/ModalConfirmPay'
import Empty from '@/components/Empty'

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)

  // Fetch Cart Data
  const { data: cartData, isLoading: isLoadingCart } = useQuery<tCart>({
    queryKey: ['cart', slug],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/carts/${slug}`).then((res) => res.json()),
    staleTime: 1000 * 10 * 1,
  })

  // Fetch product data
  const { data: productsData, isLoading: isLoadingProducts } = useQuery<
    tProduct[]
  >({
    queryKey: ['products'],
    queryFn: () =>
      fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    staleTime: 1000 * 10 * 1,
  })

  const getProductsInCart = () => {
    if (!cartData || !productsData) return []

    return cartData.products.map((cartItem) => {
      const product = productsData.find((p) => p.id === cartItem.productId)
      return product ? { ...product, quantity: cartItem.quantity } : null
    })
  }

  const filteredProducts = getProductsInCart()
  const totalBarang = filteredProducts.reduce((acc, product) => {
    return acc + (product?.quantity ?? 0)
  }, 0)
  const totalPrice = filteredProducts.reduce((acc, product) => {
    return acc + (product?.price ?? 0) * (product?.quantity ?? 0)
  }, 0)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  if (isLoadingCart || isLoadingProducts)
    return (
      <div className="max-w-5xl mx-auto pt-10 text-center">
        <h5>Loading...</h5>
      </div>
    )

  return (
    <>
      <div className="max-w-5xl mx-auto pt-10">
        <h4 className="mb-8 text-center text-2xl font-semibold">Your Cart</h4>
        {filteredProducts.length > 0 ? (
          <>
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <ProductCartCard key={product?.id} propItem={product!} />
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <div className="bg-white shadow-lg rounded-lg w-full md:w-1/3 py-6 px-8 text-black">
                <h5 className="text-lg font-semibold mb-4">Summary</h5>
                <div className="flex justify-between text-sm mb-3">
                  <span>Total Items:</span>
                  <span>{totalBarang}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setIsOpenModal(true)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <Empty title="Your Cart is Empty!" />
        )}
      </div>

      <ModalConfirmPay
        isOpen={isOpenModal}
        setIsOpen={() => setIsOpenModal(false)}
      />
    </>
  )
}
