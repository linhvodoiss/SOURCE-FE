'use client'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import http from '~/utils/http'
import { LINKS } from '~/constants/links'
import { CODE_SUCCESS } from '~/constants'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import Link from 'next/link'
const LoginFormSchema = z.object({
  userName: z.string({ message: 'Tên tài khoản là bắt buộc' }).min(1, { message: 'Tên tài khoản là bắt buộc' }),
  password: z.string({ message: 'Mật khẩu là bắt buộc' }).min(1, { message: 'Mật khẩu là bắt buộc' }),
})

export default function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  })
  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    startTransition(async () => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => res.json())

      if (!CODE_SUCCESS.includes(res.code)) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      router.refresh()
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-1/3 bg-amber-600 p-[3%] text-[#005C76]'
        autoComplete='off'
      >
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Tên tài khoản'
                  className='w-full rounded-md border-none bg-white px-[3%] py-[5%] text-base outline-none md:rounded-xl md:!text-xl'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Mật khẩu'
                  className='mt-[4%] w-full rounded-md border-none bg-white px-[3%] py-[5%] text-base outline-none md:rounded-xl md:!text-xl'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className='text-end'>
            <Link
              href='https://id.adnx.vn/forgot-password'
              className='mt-[1.5%] mb-[2%] block w-full !text-end text-[1.8vw] text-white lg:text-[1vw]'
              target='_blank'
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className='flex w-full items-center justify-between text-white'>
            <button
              className="hover-header-button flex aspect-[316/144] w-full items-center justify-center bg-red-600 bg-[url('/loren/san-boss-chao-he/header/btn_link.png')] bg-contain bg-no-repeat pb-[4%]"
              type='submit'
              disabled={isPending}
            >
              <span className='text-white'>ĐĂNG NHẬP</span>
            </button>
            <Link
              href='https://id.adnx.vn/register'
              className="hover-header-button flex aspect-[316/144] w-full items-center justify-center bg-[url('/loren/san-boss-chao-he/header/btn_link.png')] bg-contain bg-no-repeat pb-[4%]"
              target='_blank'
            >
              <span className='text-white'>ĐĂNG ký</span>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
