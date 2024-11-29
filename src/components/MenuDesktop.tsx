'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { NavigationMenu } from '../helper/NavigationMenu'
import { API_LOGIN } from '@/api/login'
import { useRouter } from 'next/router'

type Props = {
  classNameProp: string
}

export default function MenuDesktop({ classNameProp }: Props) {
  const { id } = JSON.parse(localStorage.getItem('user')!)

  const logout = () => {
    API_LOGIN.logout()
    const router = useRouter()
    router.push('/login')
  }

  return (
    <nav className={`${classNameProp} items-center justify-between gap-x-10`}>
      <>
        {NavigationMenu.map((item) => (
          <Link
            key={item.href}
            href={item.href.includes('cart') ? `${item.href}/${id}` : item.href}
            className="text-white hover:underline"
          >
            {item.title}
          </Link>
        ))}

        <h3
          onClick={() => {
            API_LOGIN.logout()
          }}
        >
          Logout
        </h3>
      </>
    </nav>
  )
}
