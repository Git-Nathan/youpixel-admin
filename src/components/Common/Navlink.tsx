import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {HTMLAttributes, ReactNode} from 'react'

export interface INavlink extends HTMLAttributes<HTMLAnchorElement> {
  href: string
  exact?: boolean
  children: ReactNode
}

export function NavLink({href, exact, children, ...props}: INavlink) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  if (isActive) {
    props.className += ' active'
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
