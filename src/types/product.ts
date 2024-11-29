export type tProduct = {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating?: Rating
  quantity?: number
  productId?: number
}

type Rating = {
  count: number
  rate: number
}

export type tCart = {
  id: number
  userId: number
  date: Date | string
  products: tProduct[]
}
