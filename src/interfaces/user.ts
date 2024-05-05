export interface IUser {
  _id?: string
  name: string
  email: string
  picture: string
  active?: boolean
  createdAt?: string
  numOfSubscriber?: number
}

export interface IUpdateUser {
  name: string
}
