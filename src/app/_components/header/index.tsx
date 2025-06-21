import Link from 'next/link'
import { WebHeaderStyled } from './styled'
import { User } from '#/user'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'

import Image from 'next/image'
import ThemeChange from '../theme-change'
import LogoutBtn from '../logout-btn'

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
  return (
    <WebHeaderStyled className='bg-background-primary border-primary-system border-b-2'>
      <div className='header__container mx-auto flex w-full max-w-[1920px] items-center justify-between pr-8 text-xl text-white'>
        <div className='flex items-center justify-start gap-8'>
          <Image
            src='/images/logo_transparent.png'
            alt='logo'
            width={1024}
            height={1024}
            className='w-24 object-contain'
          />
          <ul className='flex items-center justify-center'>
            {menuItems.map(item => (
              <li key={item.label}>
                <Link href={item.href} className='header__link'>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ThemeChange />
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
            <PopoverContent className='font-eremitage border-primary-system flex flex-col rounded-2xl border-[1px] px-0 text-lg shadow-2xl'>
              <Link
                href='/profile'
                className='border-primary-system text-primary hover:bg-primary-mute mx-auto block w-full cursor-pointer py-2 text-center'
              >
                Hồ sơ tài khoản
              </Link>
              <LogoutBtn />
            </PopoverContent>
          </Popover>
        )}
      </div>
    </WebHeaderStyled>
  )
}
