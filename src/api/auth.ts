import {IResponse} from '@/interfaces/response'
import {AxiosResponse} from 'axios'
import {axiosIntance} from '.'
import {IAuth, IAuthResponse} from './../interfaces/auth'

export class AuthApi {
  login(request: IAuth): Promise<AxiosResponse<IResponse<IAuthResponse>>> {
    return axiosIntance.post('/admin/login', request)
  }
}
