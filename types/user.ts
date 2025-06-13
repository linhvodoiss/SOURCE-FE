export type LoginResponse = {
  code: number
  message: string
  user?: UserLogin
}

type UserLogin = {
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
  serverId?: number
  characterId?: string
  characterName?: string
  serverName?: string
  gameId?: number
  totalTurn?: number
  usedTurn?: number
  streak?: number
  isReceivedStreak?: boolean
  bossGiftsReceived?: number[]
}
