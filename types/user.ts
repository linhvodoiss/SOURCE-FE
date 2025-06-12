export type LoginResponse = {
  access_token: string
  userId: string
  username: string
  created_at: string
  updated_at: string
  expires_in?: number
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
