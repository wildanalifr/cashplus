'use client'

import { API_LOGIN } from '@/api/login'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { NavigationMenu } from '../helper/NavigationMenu'

type Props = {
  classNameProp: string
}

export default function MenuDesktop({ classNameProp }: Props) {
  const { id } = JSON.parse(localStorage.getItem('user')!)

  const router = useRouter()

  const logout = () => {
    API_LOGIN.logout()
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

        <h3 className="hover:underline cursor-pointer" onClick={logout}>
          Logout
        </h3>
      </>
    </nav>
  )
}
