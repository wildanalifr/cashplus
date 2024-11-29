import { tProduct } from '@/types/product'
import Image from 'next/image'

type Props = {
  propItem: tProduct
}

export default function ProductCartCard({ propItem }: Props) {
  const { image, price, title, quantity } = propItem

  return (
    <div className="flex flex-wrap items-center">
      <div className="relative w-32 h-32">
        <Image
          src={image}
          alt={`img-${title}`}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="rounded-3xl"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow text-white">
        <h5 className="text-xl font-semibold">{title}</h5>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold">${price}</p>
          <p className="text-lg font-semibold">{quantity}</p>
        </div>
      </div>
    </div>
  )
}
