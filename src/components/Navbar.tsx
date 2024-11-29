'use client'

import Link from 'next/link'
import MenuDesktop from './MenuDesktop'
import MenuMobile from './MenuMobile'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const noNavbarRoutes = ['/login']

  const shouldShowNavbar = !noNavbarRoutes.includes(pathname)
  console.log('should', shouldShowNavbar)

  return (
    <div className="flex justify-between items-center px-4 pt-2 max-w-5xl mx-auto">
      <h3 className="text-lg font-semibold">
        <Link href={'/'}>eShop</Link>
      </h3>
      {shouldShowNavbar && (
        <>
          <MenuMobile classNameProp="block md:hidden" />
          <MenuDesktop classNameProp="hidden md:flex" />
        </>
      )}
    </div>
  )
}
