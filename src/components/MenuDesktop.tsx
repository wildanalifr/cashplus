import Link from 'next/link'
import { NavigationMenu } from '../helper/NavigationMenu'

type Props = {
  classNameProp: string
}

export default function MenuDesktop({ classNameProp }: Props) {
  return (
    <nav className={`${classNameProp} items-center justify-between gap-x-10`}>
      {NavigationMenu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-white hover:underline"
        >
          {item.key !== 'cart' ? item.title : `${item.title} (5)`}
        </Link>
      ))}
    </nav>
  )
}
