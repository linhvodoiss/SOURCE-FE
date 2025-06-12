import { User } from "#/user"
import { cookies } from "next/headers"
import { Suspense } from "react"
import { AUTH } from "~/constants"
import { AuthProvider } from "./_components/auth-context"
import { LoadingFallback } from "./_components/page-content"
import Header from "./_components/header"

export default async function Home() {
    const cookieStore = await cookies()
  const token = cookieStore.get(AUTH.token)?.value
  const user = (
    cookieStore.get(AUTH.userInfo)?.value ? JSON.parse(cookieStore.get(AUTH.userInfo)!.value) : undefined
  ) as User | undefined

  if (token) {
 console.log(token);
 console.log(user);
 
  }
  return (
 <Suspense fallback={<LoadingFallback />}>
      <AuthProvider token={token} user={user}>
        <Header/>
      <h1 className="text-4xl text-red-700">Xin chào tất cả các bạn nha mình yêu các bạn nhiều lắm!</h1>
  </AuthProvider>
    </Suspense>
 )
}