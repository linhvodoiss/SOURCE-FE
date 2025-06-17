export type BaseResponse<T> = {
  code: number
  message: string
  check?: boolean
  data?: T
  user?: T
}

export type GiftReceived = { id: number; milestone: number }
