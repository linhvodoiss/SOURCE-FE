import { env } from '~/configs/env'
import { AUTH, CODE_SUCCESS } from '~/constants'
import { LINKS } from '~/constants/links'
import http from '~/utils/http'

import { LoginResponse } from '#/user'

export async function POST(request: Request) {
  const body = await request.json()

  const res = await http.post<LoginResponse>(LINKS.login_api, { body: JSON.stringify(body) })
  console.log(res)
  console.log(body + 'test')

  const headers: HeadersInit = {}
  if (CODE_SUCCESS.includes(res.code)) {
    const expiresDate = new Date(Number(Date.now() + env.TOKEN_EXPIRED)).toUTCString()
    headers['Set-Cookie'] =
      `${AUTH.token}=${res.user?.token}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
  }
  return Response.json(res, { headers })
}
