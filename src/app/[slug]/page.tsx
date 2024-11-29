'use client'

import { tProduct } from '@/types/product'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Fragment, use, useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { product_reviews } from '@/helper/reviews'
import { useCart } from '@/context/CartContext'
import ModalAddToCart from '@/components/ModalAddToCart'

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: slugProp } = use(params)

  const { addToCart: addToCartFunc } = useCart()

  const [quantity, setQuantity] = useState<number>(0)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const decrement = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1)
    }
  }

  const increment = () => {
    setQuantity(quantity + 1)
  }

  const { data, isLoading, error } = useQuery<tProduct>({
    queryKey: ['product-detail'],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${slugProp}`).then((res) =>
        res.json()
      ),
    // stale time like data will be fresh after ... time, user go to another page and back will not fetch data until stale time is end.
    staleTime: 1000 * 10 * 1,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching product details!</div>

  const addToCart = () => {
    if (quantity > 0) {
      const cartData = {
        userId: 5,
        date: new Date().toISOString(),
        products: [{ productId: data?.id, quantity }],
      }

      const newData: tProduct = {
        id: data?.id ?? 0,
        category: data?.category ?? '',
        description: data?.description ?? '',
        image: data?.image ?? '',
        price: data?.price ?? 0,
        title: data?.title ?? '',
        productId: data?.id,
        quantity: data?.quantity,
        rating: data?.rating,
      }

      fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      })
        .then((res) => res.json())
        .then(() => {
          addToCartFunc(newData)
          setIsOpenModal(true)
        })
        .catch((err) => {
          console.error('Error adding to cart:', err)
        })
    }
  }

  return (
    <>
      <div className="max-w-5xl mx-auto pt-10 ">
        <div className="grid md:grid-cols-2 gap-5 md:gap-10 lg:gap-20">
          <div className="w-full md:max-w-72 lg:max-w-full h-60 sm:h-72 md:h-96 relative overflow-hidden">
            <Image
              src={data?.image ?? ''}
              alt={`img-${data?.title}`}
              layout="fill"
              objectFit="cover"
              loading="lazy"
              className="rounded-3xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl mt-3 font-semibold">{data?.title}</h1>
            <div className="flex items-center gap-x-2">
              <h3>
                <span className="font-semibold">Rating</span>:{' '}
                {data?.rating?.rate}
              </h3>
              <StarIcon className="w-4" />
              <p>
                {' '}
                (<span className="font-semibold">{data?.rating?.count}</span>)
                reviewers
              </p>
            </div>
            <h5>
              {' '}
              <span className="font-semibold">Category: </span> {data?.category}
            </h5>
            <p>
              <span className="font-semibold">Price:</span> ${data?.price}
            </p>

            <div className="my-3 flex items-center justify-center w-24 border border-gray-300 rounded-lg shadow-lg">
              <button
                onClick={decrement}
                className="bg-gray-200 text-2xl text-gray-800 rounded-l-lg p-2 hover:bg-gray-300 focus:outline-none"
              >
                -
              </button>
              <p className="text-xl font-semibold mx-4">{quantity}</p>
              <button
                onClick={increment}
                className="bg-gray-200 text-2xl text-gray-800 rounded-r-lg p-2 hover:bg-gray-300 focus:outline-none"
              >
                +
              </button>
            </div>

            {quantity > 0 && (
              <button
                className="border border-white rounded-full w-36 py-2 transition-all hover:bg-white hover:text-black"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>

        <div className="mt-5 pb-5 w-2/3">
          <h4 className="mb-3 font-medium text-xl">Reviews</h4>

          {product_reviews.map((item, index) => (
            <Fragment key={item.name}>
              <div className="flex items-center justify-start gap-5">
                <div className="w-8 h-8 bg-slate-400 text-gray-900 rounded-full flex items-center justify-center">
                  <h1>{item.name.toUpperCase().slice(0, 1)}</h1>
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.dateTime}</p>
                  <p>{item.review}</p>
                </div>
              </div>

              {index !== product_reviews.length - 1 && (
                <div className="border border-b-4 border-dashed border-gray-50 my-3" />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <ModalAddToCart isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </>
  )
}
