export interface IVideo {
  _id: string
  userId: string
  title: string
  desc: string
  duration: number
  imgUrl: string
  imgPath: string
  views: number
  createdAt: Date
  updatedAt: Date
  userInfo: IUserInfo
}

export interface IUserInfo {
  _id: string
  name: string
  email: string
  picture: string
  createdAt: Date
  updatedAt: Date
  __v: number
  active: boolean
}

export interface IUpdateVideo {
  title: string
  desc: string
  duration: number
  imgUrl: string
  imgPath: string
}
