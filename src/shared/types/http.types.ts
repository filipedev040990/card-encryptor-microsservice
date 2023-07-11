export type InputController = {
  originalUrl?: any
  method?: string
  socket?: any
  ip?: any
  headers?: any
  params?: any
  body?: any
  application?: any
}

export type OutputController = {
  statusCode: number
  body: any
}
