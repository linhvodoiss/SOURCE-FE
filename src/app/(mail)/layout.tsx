import HeaderMail from '../_components/headerMail'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <HeaderMail />
      {children}
    </>
  )
}
