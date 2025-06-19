'use client'
import Link from 'next/link'
import { WebHeaderStyled } from './styled'
import { User } from '#/user'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { useTransition } from 'react'
import http from '~/utils/http'
import { LINKS } from '~/constants/links'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '~/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'

type Props = Readonly<{
  token?: string
  user?: User
}>

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Product', href: '/' },
  { label: 'Blog', href: '/' },
  { label: 'About', href: '/' },
]

export default function Header({ token, user }: Props) {
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isPending, startTransition] = useTransition()
  const current = theme === 'system' ? resolvedTheme : theme
  const logoutHandler = () => {
    startTransition(async () => {
      await http.post(LINKS.logout_api, { baseUrl: 'api/auth' })
      router.push('/')
      router.refresh()
    })
  }

  return (
    <WebHeaderStyled className='bg-background-primary border-primary-system border-b-2'>
      <div className='header__container mx-auto flex w-full max-w-[1920px] items-center justify-between pr-8 text-2xl text-white'>
        <div className='flex items-center justify-start gap-8'>
          <Image src='/images/logo.png' alt='logo' width={1024} height={1024} className='w-24 object-contain' />
          <ul className='flex items-center justify-center'>
            {menuItems.map(item => (
              <li key={item.label}>
                <Link href={item.href} className='header__link'>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button
                className='hover:!bg-toggle scale-150 !border-none !bg-transparent !text-white'
                variant='outline'
                size='icon'
                aria-label='Toggle theme'
                onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
              >
                {current === 'dark' ? <Sun className='h-8 w-8' /> : <Moon className='h-8 w-8' />}
              </Button>
            </li>
          </ul>
        </div>
        {!token ? (
          <Link href='/login' className='header__link'>
            Đăng nhập
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger>
              <div className='header__link'>{user?.userName}</div>
            </PopoverTrigger>
            <PopoverContent className='font-eremitage border-primary-system flex flex-col rounded-2xl border-[1px] px-0 text-xl shadow-2xl'>
              <button className='border-primary-system text-primary hover:bg-primary-mute w-full cursor-pointer py-2'>
                Hồ sơ tài khoản
              </button>
              <button
                disabled={isPending}
                className='border-primary-system text-primary hover:bg-primary-mute w-full cursor-pointer py-2'
                onClick={logoutHandler}
              >
                Đăng xuất
              </button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </WebHeaderStyled>
  )
}
