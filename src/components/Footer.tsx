import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

export function Footer() {
  return (
    <footer className="bg-slate-50">
      <Container>
        <div className="py-16">
          <Logo className="mx-auto h-10 w-auto" />
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex justify-center gap-x-6">
              <NavLink href="https://docs.google.com/forms/d/1VF8q7I2njamJxIwIrQ5Vx5bvJEnN9Of-scHxpIVwZ5g/viewform?edit_requested=true">Contact</NavLink>
              <NavLink href="https://docs.google.com/forms/d/1zx6kh1xGtjsASvWDTdBECk6YTHDYnj80nTq6AmPweN0/viewform?edit_requested=true">Faire de la publicité</NavLink>
              <NavLink href="https://courscryptomonnaies.com/">Cours crypto</NavLink>
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6">
            <Link href="https://x.com/juliendvr" className="group" aria-label="Courscryptomonnaies.com sur X">
              <svg
                className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" />
              </svg>
            </Link>
          </div>
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright &copy; {new Date().getFullYear()} Le cours des crypto-monnaies en temps réel. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  )
}
