export type LoginResponse = {
  token: string
  userName: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: number
  role: string
  id: number
  status: string
}

export type User = {
  id?: string
  userName?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: number
}
