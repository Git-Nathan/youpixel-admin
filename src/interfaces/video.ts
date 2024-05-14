export interface IVideo {
  _id: string
  userId: string
  title: string
  desc: string
  duration: number
  imgUrl: string
  imgPath: string
  videoUrl: string
  videoPath: string
  views: number
  createdAt: string
  updatedAt: string
  userInfo: IUserInfo
}

export interface IUserInfo {
  _id: string
  name: string
  email: string
  picture: string
  createdAt: string
  updatedAt: string
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
