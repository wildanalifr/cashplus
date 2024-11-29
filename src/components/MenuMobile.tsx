'use client'

import { API_LOGIN } from '@/api/login'
import { NavigationMenu } from '@/helper/NavigationMenu'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  classNameProp: string
}

export default function MenuMobile({ classNameProp }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { id } = JSON.parse(localStorage.getItem('user')!)

  const router = useRouter()

  const logout = () => {
    API_LOGIN.logout()
    router.push('/login')
  }

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
          {NavigationMenu.map((item) => (
            <Link
              key={item.href}
              href={
                item.href.includes('cart') ? `${item.href}/${id}` : item.href
              }
              className="text-black hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          <h3
            className="text-black hover:underline cursor-pointer"
            onClick={logout}
          >
            Logout
          </h3>
        </nav>
      )}
    </div>
  )
}
