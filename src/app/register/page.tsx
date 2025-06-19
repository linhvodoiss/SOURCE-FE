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
import { RegisterStyled } from './styled'
import Link from 'next/link'
const RegisterFormSchema = z.object({
  userName: z.string({ message: 'Tên tài khoản là bắt buộc' }).min(1, { message: 'Tên tài khoản là bắt buộc' }),
  firstName: z.string({ message: 'Họ của bạn là bắt buộc' }).min(1, { message: 'Họ của bạn là bắt buộc' }),
  lastName: z.string({ message: 'Tên của bạn là bắt buộc' }).min(1, { message: 'Tên của bạn là bắt buộc' }),
  email: z.string().min(1, { message: 'Email là bắt buộc' }).email({ message: 'Email không hợp lệ' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Số điện thoại phải đủ 10–12 chữ số' })
    .max(12, { message: 'Số điện thoại phải đủ 10–12 chữ số' })
    .regex(/^[0-9]+$/, { message: 'Số điện thoại chỉ chứa chữ số' }),
  password: z.string({ message: 'Mật khẩu là bắt buộc' }).min(1, { message: 'Mật khẩu là bắt buộc' }),
})

export default function LoginForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phoneNumber: '',
    },
  })
  async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    startTransition(async () => {
      const [checkEmailRes, checkUserNameRes] = await Promise.all([
        http.get<{ check: boolean }>(LINKS.check_email_exist, {
          params: { email: data.email },
        }),
        http.get<{ check: boolean }>(LINKS.check_username_exist, {
          params: { userName: data.userName },
        }),
      ])

      if (checkEmailRes.check || checkUserNameRes.check) {
        if (checkEmailRes.check) toast.error('Email đã tồn tại')
        if (checkUserNameRes.check) toast.error('Tài khoản đã tồn tại')
        return
      }

      const res = await http.post(LINKS.register_api, {
        body: JSON.stringify(data),
      })

      if (!CODE_SUCCESS.includes(res.code)) {
        toast.error('Đăng ký thất bại')
        return
      }

      toast.success('Đăng ký thành công')
      router.push('/login')
      router.refresh()
    })
  }

  return (
    <RegisterStyled>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='form border-primary-system mx-auto mt-12 w-[600px] rounded-2xl border-2 px-8 py-12 shadow-2xl'
          autoComplete='off'
        >
          <h2 className='text-primary text-center text-4xl'>Đăng ký</h2>
          <FormField
            control={form.control}
            name='userName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Tên tài khoản'
                    className='mt-8 w-full rounded-xl border-2 px-4 py-8 !text-lg'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <div className='mt-8 flex w-full items-start justify-between gap-8'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Họ của bạn'
                      className='w-full rounded-xl border-2 px-4 py-8 !text-lg'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-700' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Tên của bạn'
                      className='w-full rounded-xl border-2 px-4 py-8 !text-lg'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-red-700' />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Email của bạn'
                    className='mt-8 w-full rounded-xl border-2 px-4 py-8 !text-lg'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phoneNumber'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Số điện thoại'
                    className='mt-8 w-full rounded-xl border-2 px-4 py-8 !text-lg'
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
                    className='mt-8 w-full rounded-xl border-2 px-4 py-8 !text-lg'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-red-700' />
              </FormItem>
            )}
          />
          <button
            className='hover-header-button bg-primary-system mx-auto mt-8 block w-full cursor-pointer items-center justify-center rounded-2xl px-12 py-6 text-white'
            disabled={isPending}
          >
            TIẾP TỤC
          </button>
          <p className='text-md mt-8 text-center'>
            Bạn có tài khoản?
            <Link href='/login' className='text-primary'>
              Đăng nhập
            </Link>
          </p>
        </form>
      </Form>
    </RegisterStyled>
  )
}
