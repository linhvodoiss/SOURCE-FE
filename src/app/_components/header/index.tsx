'use client'

import Link from 'next/link'
import { WebHeaderStyled } from './styled'

export default function Header() {
  return (
    <WebHeaderStyled className='mx-auto'>
      <div className='header__container flex w-full items-center justify-between px-8 py-4 text-2xl text-white'>
        <ul className='flex items-center justify-center'>
          <li>
            <Link href='/' className='px-8 py-4 hover:underline'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/' className='px-8 py-4 hover:underline'>
              Product
            </Link>
          </li>
          <li>
            <Link href='/' className='px-8 py-4 hover:underline'>
              Blog
            </Link>
          </li>
          <li>
            <Link href='/' className='px-8 py-4 hover:underline'>
              About
            </Link>
          </li>
        </ul>
        <Link href='/login'>Đăng nhập</Link>
      </div>
    </WebHeaderStyled>
  )
}
