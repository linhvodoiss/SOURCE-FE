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
import { LoginResponse } from '#/user'

// export const URL_LOGIN = 'login'
// export const URL_REGISTER = 'users'
// export const URL_FORGET = 'users/resetPasswordRequest'
// export const URL_LOGOUT = 'logout'
// export const URL_EMAIL_EXIST = 'users/email'
// export const URL_USERNAME_EXIST = 'users/userName'
// export const URL_ACTIVE_AUTOMATIC = 'users/activeUser'
// export const URL_RESET_PASSWORD = 'users/resetPassword'
// export const URL_GET_PROFILE = 'users/profile'
// activeAutomatically(token: string) {
//   return http.get<AuthResponse>(`${URL_ACTIVE_AUTOMATIC}?token=${token}`)
// },
// resetPassword({ token, newPassword }: { token: string; newPassword: string }) {
//   return http.get<AuthResponse>(`${URL_RESET_PASSWORD}?token=${token}&newPassword=${newPassword}`)
// },
// forget(email: string) {
//   return http.get<AuthResponse>(`${URL_FORGET}?email=${email}`)
// },

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
      const res = await http.post<LoginResponse>(LINKS.login_api, { body: JSON.stringify(data), baseUrl: 'api/auth' })
      if (!CODE_SUCCESS.includes(res.code)) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      router.push('/')
      router.refresh()
    })
  }

  return (
    <LoginStyled>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='form border-primary-system mx-auto mt-12 w-[600px] rounded-2xl border-2 px-8 py-12 shadow-2xl'
          autoComplete='off'
        >
          <h2 className='text-primary text-center text-4xl'>Đăng nhập</h2>
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
                <FormMessage className='data-[error=true]:text-destructive' />
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
                <FormMessage className='data-[error=true]:text-destructive' />
              </FormItem>
            )}
          />
          <div>
            <div className='text-primary text-end'>
              <Link href='/forget' className='text-md mt-4 mb-4 block w-full !text-end'>
                Quên mật khẩu?
              </Link>
            </div>
            <div className='flex w-full items-center justify-between gap-4 text-white'>
              <button
                className='hover-header-button bg-primary-system w-full cursor-pointer items-center justify-center rounded-2xl py-6'
                type='submit'
                disabled={isPending}
              >
                ĐĂNG NHẬP
              </button>
              <Link
                href='/register'
                className='hover-header-button text-primary border-primary-system flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 py-6'
              >
                ĐĂNG KÝ
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </LoginStyled>
  )
}
