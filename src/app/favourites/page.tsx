'use client'

import Empty from '@/components/Empty'
import ProductCard from '@/components/ProductCard'
import { useLikeProduct } from '@/context/LikeProductContext'

export default function Favourites() {
  const { likeProducts } = useLikeProduct()

  return (
    <div className="mt-5 max-w-5xl mx-auto text-center">
      <h4 className="text-xl">Favourites</h4>
      {likeProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likeProducts.map((item) => (
            <ProductCard key={item.id} propItem={item} />
          ))}
        </div>
      ) : (
        <div className="mt-20">
          <Empty title="Empty!, please choose your favourite product" />
        </div>
      )}
    </div>
  )
}
