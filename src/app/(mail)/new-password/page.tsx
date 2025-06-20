'use client'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import http from '~/utils/http'
import { LINKS } from '~/constants/links'
import { CODE_SUCCESS } from '~/constants'
import { toast } from 'sonner'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { ResetPasswordStyled } from './styled'

export const ResetPasswordFormSchema = z
  .object({
    password: z.string({ message: 'Mật khẩu là bắt buộc' }).min(1, { message: 'Mật khẩu là bắt buộc' }),
    rePassword: z.string({ message: 'Mật khẩu là bắt buộc' }).min(1, { message: 'Mật khẩu là bắt buộc' }),
  })
  .refine(data => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Mật khẩu nhập lại không khớp',
  })

export default function ResetPasswordForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      rePassword: '',
    },
  })
  async function onSubmit(data: z.infer<typeof ResetPasswordFormSchema>) {
    startTransition(async () => {
      const res = await http.get(LINKS.reset_password, {
        params: {
          newPassword: data.password,
          token,
        },
      })
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
    <ResetPasswordStyled>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='form border-primary-system mx-auto mt-12 w-[600px] rounded-2xl border-2 px-8 pt-8 pb-12 shadow-2xl'
          autoComplete='off'
        >
          <h2 className='text-primary pb-4 text-center text-3xl'>Đổi mật khẩu</h2>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Mật khẩu'
                    className='mt-4 w-full rounded-xl border-2 px-4 py-6 !text-base'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='data-[error=true]:text-destructive' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rePassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Xác nhận mật khẩu'
                    className='mt-4 w-full rounded-xl border-2 px-4 py-6 !text-base'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='data-[error=true]:text-destructive' />
              </FormItem>
            )}
          />
          <div>
            <button
              className='hover-header-button bg-primary-system mx-auto mt-4 block w-full cursor-pointer items-center justify-center rounded-2xl px-12 py-4 text-white'
              disabled={isPending}
            >
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </Form>
    </ResetPasswordStyled>
  )
}
