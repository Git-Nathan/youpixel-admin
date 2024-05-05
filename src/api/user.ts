import {IResponse} from '@/interfaces/response'
import {IUpdateUser, IUser} from '@/interfaces/user'
import {AxiosResponse} from 'axios'
import {axiosIntance} from '.'

export class UserApi {
  getList(
    page: number,
    searchQuery: string,
  ): Promise<AxiosResponse<IResponse<IUser[]>>> {
    return axiosIntance.get(`/users?page=${page}&search_query=${searchQuery}`)
  }

  getById(id: string): Promise<AxiosResponse<IResponse<IUser>>> {
    return axiosIntance.get(`/users/${id}`)
  }

  delete(id: string): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.delete(`/users/${id}`)
  }

  active(id: string): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.patch(`/users/active/${id}`)
  }

  update(
    id: string,
    data: IUpdateUser,
  ): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.patch(`/users/${id}`, data)
  }
}
