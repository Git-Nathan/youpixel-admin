export interface IResponse<T> {
  message?: string
  data?: T
  numberOfPages?: number
  total?: number
}
