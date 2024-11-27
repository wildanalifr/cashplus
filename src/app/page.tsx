'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { tProduct } from '../types/product'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const { data, isLoading } = useQuery<tProduct[]>({
    queryKey: ['products'],
    queryFn: () =>
      fetch('https://fakestoreapi.com/products').then((res) => res.json()),
    // stale time like data will be fresh after ... time, user go to another page and back will not fetch data until stale time is end.
    staleTime: 1000 * 10 * 1,
  })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mt-10 flex justify-between items-center border border-white py-2 px-3 rounded-3xl">
        <div className="">
          <h3 className="mb-5">Peak your headphone</h3>
          <div className="bg-white text-black px-3 py-2 rounded-full text-center cursor-pointer hover:font-bold transition-all">
            Buy Now
          </div>
        </div>
        <Image
          src={
            'https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          className="rounded-3xl"
          alt="image"
          width={300}
          height={300}
        />
      </div>

      <div className="mt-5">
        {isLoading && <p>loading....</p>}
        {!isLoading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.map((item) => (
              <ProductCard key={item.id} propItem={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
