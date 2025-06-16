'use client'
import Link from 'next/link'
import { WebHeaderStyled } from './styled'
import { User } from '#/user'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { useTransition } from 'react'
import http from '~/utils/http'
import { LINKS } from '~/constants/links'
import { useRouter } from 'next/navigation'

type Props = Readonly<{
  token?: string
  user?: User
}>

export default function Header({ token, user }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const logoutHandler = () => {
    startTransition(async () => {
      await http.post(LINKS.logout_api, { baseUrl: 'api/auth' })
      router.refresh()
    })
  }

  return (
    <WebHeaderStyled className='bg-[#005C76]'>
      <div className='header__container mx-auto flex w-full max-w-[1920px] items-center justify-between px-8 text-2xl text-white'>
        <ul className='flex items-center justify-center'>
          <li>
            <Link href='/' className='px-8 py-6 hover:underline'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/' className='px-8 py-6 hover:underline'>
              Product
            </Link>
          </li>
          <li>
            <Link href='/' className='px-8 py-6 hover:underline'>
              Blog
            </Link>
          </li>
          <li>
            <Link href='/' className='px-8 py-6 hover:underline'>
              About
            </Link>
          </li>
        </ul>
        {!token ? (
          <Link href='/login' className='px-8 py-6 hover:underline'>
            Đăng nhập
          </Link>
        ) : (
          <Popover>
            <PopoverTrigger>
              <div className='cursor-pointer px-8 py-6 hover:underline'>{user?.userName}</div>
            </PopoverTrigger>
            <PopoverContent className='font-eremitage border-primary-system flex flex-col rounded-2xl border-2 text-xl shadow-2xl'>
              <button className='text-primary border-primary-system w-full cursor-pointer rounded-t-2xl border-2 border-b-0 py-2 hover:underline'>
                Hồ sơ tài khoản
              </button>
              <button
                disabled={isPending}
                className='text-primary border-primary-system w-full cursor-pointer rounded-b-2xl border-2 py-2 hover:underline'
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
