'use client'

import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
  classNameProp: string
}

export default function MenuMobile({ classNameProp }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={classNameProp}>
      <Bars3Icon
        className="size-10 cursor-pointer"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
      />
      {isOpen && (
        <nav
          className={`absolute left-0 top-12 z-10 w-full h-[100vh] bg-white flex flex-col items-center justify-center gap-10 text-3xl transition-all transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Link href="#" className="text-gray-500 hover:text-gray-800">
            Favourites
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-800">
            Cart()
          </Link>
        </nav>
      )}
    </div>
  )
}
