'use client'
import Link from 'next/link'
import { WebHeaderStyled } from './styled'
import { User } from '#/user'
import { useEffect } from 'react'

type Props = Readonly<{
  token?: string
  user?: User
}>

export default function Header({ token, user }: Props) {
  return (
    <WebHeaderStyled className='mx-auto'>
      <div className='header__container flex w-full items-center justify-between px-8 text-2xl text-white'>
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
          <button className='px-8 py-6 hover:underline'>Đăng xuất</button>
        )}
      </div>
    </WebHeaderStyled>
  )
}
