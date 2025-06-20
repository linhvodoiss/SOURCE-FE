import { cookies } from 'next/headers'
import { AUTH } from '~/constants'
import { User } from '#/user'
import { AuthProvider } from '../_components/auth-context'
import Header from '../_components/header'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH.token)?.value
  const user = (
    cookieStore.get(AUTH.userInfo)?.value ? JSON.parse(cookieStore.get(AUTH.userInfo)!.value) : undefined
  ) as User | undefined

  return (
    <AuthProvider token={token} user={user}>
      <Header token={token} user={user} />
      <div className='mx-auto w-full max-w-[1536px]'>{children}</div>
    </AuthProvider>
  )
}
