interface AffiliateDisclosureProps {
  className?: string
}

export function AffiliateDisclosure({ className = '' }: AffiliateDisclosureProps) {
  return (
    <div className={`rounded-lg bg-slate-50 border border-slate-200 p-4 ${className}`}>
      <p className="text-sm text-slate-600">
        <strong className="font-semibold text-slate-900">Note importante :</strong> Certains liens sur ce site sont des liens d'affiliation. 
        Si vous effectuez un achat via ces liens, nous pouvons recevoir une commission, sans frais supplémentaires pour vous. 
        Cela nous aide à maintenir ce site gratuit et à jour. Nous ne recommandons que des services que nous utilisons ou que nous avons soigneusement examinés.
      </p>
    </div>
  )
}

