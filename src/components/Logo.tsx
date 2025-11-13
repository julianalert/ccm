import logoImage from '@/images/logo.svg'

export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoImage.src || logoImage}
      alt="Cours crypto monnaies"
      aria-hidden="true"
      {...props}
    />
  )
}
