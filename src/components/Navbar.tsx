import Link from 'next/link'
import MenuDesktop from './MenuDesktop'
import MenuMobile from './MenuMobile'

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-4 pt-2 max-w-5xl mx-auto">
      <h3 className="text-lg font-semibold">
        <Link href={'/'}>eShop</Link>
      </h3>
      <MenuMobile classNameProp="block md:hidden" />
      <MenuDesktop classNameProp="hidden md:flex" />
    </div>
  )
}
