import type { Metadata } from 'next'
import './globals.css'
import { cn } from '~/utils/cn'
import { Toaster } from '~/components/ui/sonner'
import { eremitageFont } from '~/fonts/eremitage'

export const metadata: Metadata = {
  title: 'Automate',
  description: 'Automate For Solution',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn('antialiased', eremitageFont.variable)} suppressHydrationWarning>
        <div className='font-eremitage'>{children}</div>
        <Toaster richColors theme='light' />
      </body>
    </html>
  )
}
