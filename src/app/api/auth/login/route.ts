import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH, CODE_SUCCESS } from '~/constants'
import { LINKS } from '~/constants/links'
import http from '~/utils/http'
import { env } from '~/configs/env'
import { LoginResponse } from '#/user'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await http.post<LoginResponse>(LINKS.login_api, {
    body: JSON.stringify(body),
  })

  const response = NextResponse.json(res)
  console.log('res.code:', res.code)
  console.log('res.user:', res.user)
  console.log('token:', res.user?.token)
  console.log(res)

  if (CODE_SUCCESS.includes(res.code)) {
    const expiresDate = new Date(Date.now() + Number(env.TOKEN_EXPIRED))
    response.cookies.set(AUTH.token, res.user?.token || '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: expiresDate,
      path: '/', // nên đặt path cụ thể nếu cần
    })
  }

  return response
}
