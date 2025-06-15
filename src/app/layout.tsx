import type { Metadata } from 'next'
import './globals.css'
import { cn } from '~/utils/cn'
import { Toaster } from '~/components/ui/sonner'
import { eremitageFont } from '~/fonts/eremitage'
import { LoadingFallback } from './_components/page-content'
import { Suspense } from 'react'
import { AuthProvider } from './_components/auth-context'
import Header from './_components/header'
import { cookies } from 'next/headers'
import { AUTH } from '~/constants'
import { User } from '#/user'

export const metadata: Metadata = {
  title: 'Automate',
  description: 'Automate For Solution',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH.token)?.value
  const user = (
    cookieStore.get(AUTH.userInfo)?.value ? JSON.parse(cookieStore.get(AUTH.userInfo)!.value) : undefined
  ) as User | undefined

  if (token) {
    console.log(token)
    console.log(user)
  }
  return (
    <html lang='en'>
      <body className={cn('antialiased', eremitageFont.variable)} suppressHydrationWarning>
        <div className='font-eremitage'>
          <Suspense fallback={<LoadingFallback />}>
            <AuthProvider token={token} user={user}>
              <Header />
              {children}
            </AuthProvider>
          </Suspense>
        </div>
        <Toaster richColors theme='light' />
      </body>
    </html>
  )
}
