import Link from 'next/link'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
  nofollow?: boolean
}

export function NavLink({
  href,
  children,
  external = false,
  nofollow = false,
}: NavLinkProps) {
  const isExternal = external || href.startsWith('http')
  const rel = isExternal
    ? `${nofollow ? 'nofollow ' : ''}noopener noreferrer`
    : undefined

  if (isExternal) {
    return (
      <a
        href={href}
        rel={rel}
        target="_blank"
        className="inline-block rounded-lg px-2 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className="inline-block rounded-lg px-2 py-1 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </Link>
  )
}
