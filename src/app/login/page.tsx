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
import { LoginStyled } from './styled'
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
      const res = await http.post(LINKS.login_api, { body: JSON.stringify(data), baseUrl: 'api/auth' })
      if (!CODE_SUCCESS.includes(res.code)) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      router.refresh()
    })
  }

  return (
    <LoginStyled>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='form mx-auto mt-4 w-[600px] rounded-2xl border-2 border-[#005C76] px-8 py-12 text-[#005C76] shadow-2xl'
          autoComplete='off'
        >
          <h2 className='text-center text-4xl'>Đăng nhập</h2>
          <FormField
            control={form.control}
            name='userName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Tên tài khoản'
                    className='mt-4 w-full rounded-xl bg-white px-4 py-6 text-base'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
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
                    className='mt-4 w-full rounded-xl bg-white px-4 py-6 text-base'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <div>
            <div className='text-end'>
              <Link
                href='https://id.adnx.vn/forgot-password'
                className='mt-4 mb-4 block w-full !text-end text-xs text-white'
                target='_blank'
              >
                Quên mật khẩu?
              </Link>
            </div>
            <div className='flex w-full items-center justify-between gap-4 text-white'>
              <button
                className='hover-header-button w-full cursor-pointer items-center justify-center rounded-2xl bg-[#005C76] py-4'
                type='submit'
                disabled={isPending}
              >
                ĐĂNG NHẬP
              </button>
              <button className='hover-header-button w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-[#005C76] py-4 text-[#005C76]'>
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </form>
      </Form>
    </LoginStyled>
  )
}
