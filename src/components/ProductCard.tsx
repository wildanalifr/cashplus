import { useCart } from '@/context/CartContext'
import { useLikeProduct } from '@/context/LikeProductContext'
import { tProduct } from '@/types/product'
import { HeartIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Props = {
  propItem: tProduct
}

export default function ProductCard({ propItem }: Props) {
  const { category, description, id, image, price, title } = propItem

  const { likeProducts, addToLikeProduct, removeToLikeProduct } =
    useLikeProduct()

  const router = useRouter()

  const { addToCart } = useCart()
  const isFavourites =
    likeProducts.filter((item) => item.id === id).length > 0 ? true : false

  return (
    <div className="border border-gray-200 rounded-3xl shadow-lg overflow-hidden relative w-full h-full flex flex-col">
      <div className="w-full h-60 relative overflow-hidden">
        <Image
          src={image}
          alt={`img-${title}`}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="rounded-t-3xl transition-transform duration-500 ease-in-out hover:scale-110 cursor-pointer"
        />

        <div className="w-9 h-9 bg-white rounded-full absolute top-2 right-2 flex items-center justify-center">
          <HeartIcon
            className={`w-8 h-8 ${
              isFavourites ? 'text-red-500' : 'text-black'
            } hover:text-red-500 cursor-pointer`}
            onClick={() =>
              isFavourites
                ? removeToLikeProduct(id)
                : addToLikeProduct(propItem)
            }
          />
        </div>
      </div>

      <div
        onClick={() => {
          router.push(`/${id}`)
        }}
        className="p-4 flex flex-col flex-grow text-white"
      >
        <h5 className="text-xl font-semibold truncate">{title}</h5>
        <p className="text-sm mt-1">{category}</p>
        <p className="text-sm mt-2 truncate">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-semibold ">${price}</p>
          <button
            onClick={() => addToCart(propItem)}
            className="border-white border text-white rounded-full px-4 py-2 transition duration-200 hover:bg-white hover:text-black cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
