'use client'

import Empty from '@/components/Empty'
import FilterSort from '@/components/FilterSort'
import ProductCard from '@/components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { tProduct } from '../types/product'

export default function Home() {
  const [filterSort, setFilterSort] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const handleOnChangeFilterSort = (data: string) => {
    setFilterSort(data)
  }

  const { data, isLoading } = useQuery<tProduct[]>({
    queryKey: ['products', filterSort],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products?sort=${filterSort}`).then(
        (res) => res.json()
      ),
    staleTime: 1000 * 10 * 1,
  })

  const filterData = useMemo(() => {
    if (!data) return []
    return data.filter((item) => {
      const title = item.title.toLowerCase()
      const searchTerm = search.toLowerCase()
      return title.includes(searchTerm)
    })
  }, [data, search])

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

      <div className="flex items-center justify-between my-2 gap-3">
        <input
          className="flex-1 bg-white text-gray-800 placeholder-gray-400 outline-none px-4 py-2 space-x-2 rounded-lg "
          type="text"
          placeholder="Search product name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterSort typeSort={filterSort} onChange={handleOnChangeFilterSort} />
      </div>

      <div>
        {isLoading && <p>loading....</p>}

        {!isLoading && filterData?.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filterData.map((item) => (
              <ProductCard key={item.id} propItem={item} />
            ))}
          </div>
        ) : (
          <div className="mt-2">
            <Empty title="Your product is not found!" />
          </div>
        )}
      </div>
    </div>
  )
}
