interface LastUpdatedProps {
  date: Date | string
  className?: string
}

export function LastUpdated({ date, className = '' }: LastUpdatedProps) {
  const updatedDate = typeof date === 'string' ? new Date(date) : date
  
  const formattedDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(updatedDate)

  return (
    <p className={`text-sm text-slate-500 ${className}`}>
      Dernière mise à jour : {formattedDate}
    </p>
  )
}

