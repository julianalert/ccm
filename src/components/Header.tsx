'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Popover,
  PopoverButton,
  PopoverBackdrop,
  PopoverPanel,
} from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { NavLink } from '@/components/NavLink'

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <PopoverButton as={Link} href={href} className="block w-full p-2">
      {children}
    </PopoverButton>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
    >
      <path
        d="M0 1H14M0 7H14M0 13H14"
        className={clsx(
          'origin-center transition',
          open && 'scale-90 opacity-0',
        )}
      />
      <path
        d="M2 2L12 12M12 2L2 12"
        className={clsx(
          'origin-center transition',
          !open && 'scale-90 opacity-0',
        )}
      />
    </svg>
  )
}

function MobileNavigation() {
  return (
    <Popover>
      <PopoverButton
        className="relative z-10 flex h-8 w-8 items-center justify-center focus:not-data-focus:outline-hidden"
        aria-label="Toggle Navigation"
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-slate-300/50 duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in"
      />
      <PopoverPanel
        transition
        className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
      >
        <MobileNavLink href="/bitcoin">Bitcoin</MobileNavLink>
        <MobileNavLink href="/ethereum">Ethereum</MobileNavLink>
        <hr className="m-2 border-slate-300/40" />
        <MobileNavLink href="https://www.binance.com/fr/register?ref=16287317">Acheter des cryptos</MobileNavLink>
      </PopoverPanel>
    </Popover>
  )
}

export function Header() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<string | null>(null)

  const handleSyncCryptocurrencies = async () => {
    setIsSyncing(true)
    setSyncMessage(null)

    try {
      const response = await fetch('/api/cryptocurrencies/sync', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sync cryptocurrencies')
      }

      setSyncMessage(`Successfully synced ${data.count} cryptocurrencies!`)
      
      // Clear message after 5 seconds
      setTimeout(() => setSyncMessage(null), 5000)
    } catch (error) {
      setSyncMessage(
        error instanceof Error ? error.message : 'Failed to sync cryptocurrencies'
      )
      
      // Clear error message after 5 seconds
      setTimeout(() => setSyncMessage(null), 5000)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <NavLink href="/bitcoin">Bitcoin</NavLink>
              <NavLink href="/ethereum">Ethereum</NavLink>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block relative">
              <Button
                onClick={handleSyncCryptocurrencies}
                disabled={isSyncing}
                color="slate"
                variant="outline"
              >
                {isSyncing ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Syncing...
                  </span>
                ) : (
                  'Sync Cryptos'
                )}
              </Button>
              {syncMessage && (
                <div
                  className={clsx(
                    'absolute top-full left-0 mt-2 px-3 py-2 rounded-md text-sm whitespace-nowrap z-50 shadow-lg',
                    syncMessage.includes('Successfully')
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  )}
                >
                  {syncMessage}
                </div>
              )}
            </div>
            {/* <div className="hidden md:block">
              <NavLink href="/login">Sign in</NavLink>
            </div> */}
            <Button href="https://www.binance.com/fr/register?ref=16287317" color="blue">
              <span>
                Acheter des cryptos
              </span>
            </Button>
            <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}
