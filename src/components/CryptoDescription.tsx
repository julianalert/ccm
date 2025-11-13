import { CryptocurrencyRow } from '@/lib/db/cryptocurrencies'

interface CryptoDescriptionProps {
  crypto: CryptocurrencyRow
}

export function CryptoDescription({ crypto }: CryptoDescriptionProps) {
  // Placeholder content - you can replace this with actual description data
  // or fetch it from an API/database
  const description = `
    ${crypto.name} (${crypto.symbol}) est une cryptomonnaie majeure sur le marché. 
    Avec une capitalisation boursière de ${crypto.quote?.EUR?.market_cap ? new Intl.NumberFormat('fr-FR').format(crypto.quote.EUR.market_cap) : 'N/A'} €, 
    elle occupe une position importante dans l'écosystème des cryptomonnaies.
    
    Cette cryptomonnaie utilise la technologie blockchain pour garantir la sécurité et la décentralisation 
    des transactions. Elle permet des transferts de valeur rapides et sécurisés sans l'intervention 
    d'une autorité centrale.
    
    Le marché des cryptomonnaies est en constante évolution, et ${crypto.name} continue de jouer 
    un rôle significatif dans cette transformation financière. Les investisseurs et les utilisateurs 
    suivent de près son évolution, notamment en raison de sa liquidité et de son adoption croissante.
  `

  return (
    <div className="mt-8 w-full">
      <h2 className="mt-12 font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
        À propos de {crypto.name}
      </h2>
      <div className="mt-4">
        {description.split('\n').map((paragraph, index) => {
          const trimmed = paragraph.trim()
          if (!trimmed) return null
          return (
            <p key={index} className="mt-4 text-lg tracking-tight text-slate-700">
              {trimmed}
            </p>
          )
        })}
      </div>
    </div>
  )
}

