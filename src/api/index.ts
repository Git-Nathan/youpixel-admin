import axios from 'axios'
import {AuthApi} from './auth'
import {UserApi} from './user'

// export const axiosIntance = axios.create({
//   baseURL: 'https://youpixel-api.onrender.com/',
// })
export const axiosIntance = axios.create({baseURL: 'http://localhost:5002'})

axiosIntance.interceptors.request.use(async (req) => {
  const value = localStorage?.getItem('token')

  if (value !== null) {
    req.headers.Authorization = value
  }

  return req
})

const auth = new AuthApi()
const user = new UserApi()

export const api = {auth, user}
