export type BaseResponse<T> = {
  code: number
  message: string
  data?: T
}

export type GiftReceived = { id: number; milestone: number }
