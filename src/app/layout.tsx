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
import { ThemeProvider } from './_components/theme-provider'

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

  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }} suppressHydrationWarning>
      <body className={cn('antialiased', eremitageFont.variable)} suppressHydrationWarning>
        <div className='font-eremitage'>
          <Suspense fallback={<LoadingFallback />}>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <AuthProvider token={token} user={user}>
                <Header token={token} user={user} />
                {children}
              </AuthProvider>
            </ThemeProvider>
          </Suspense>
        </div>
        <Toaster richColors theme='light' />
      </body>
    </html>
  )
}
