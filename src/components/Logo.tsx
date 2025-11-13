import logoImage from '@/images/logo.svg'

export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      src={logoImage.src || logoImage}
      alt="Logo"
      aria-hidden="true"
      {...props}
    />
  )
}
