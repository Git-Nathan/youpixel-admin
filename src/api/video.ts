import {IResponse} from '@/interfaces/response'
import {IUpdateUser} from '@/interfaces/user'
import {IVideo} from '@/interfaces/video'
import {AxiosResponse} from 'axios'
import {axiosIntance} from '.'

export class VideoApi {
  getList(
    page: number,
    searchQuery: string,
  ): Promise<AxiosResponse<IResponse<IVideo[]>>> {
    return axiosIntance.get(
      `/videos/search?page=${page}&search_query=${searchQuery}`,
    )
  }

  getListPending(
    page: number,
    searchQuery: string,
  ): Promise<AxiosResponse<IResponse<IVideo[]>>> {
    return axiosIntance.get(
      `/videos/search/pending?page=${page}&search_query=${searchQuery}`,
    )
  }

  getListDenided(
    page: number,
    searchQuery: string,
  ): Promise<AxiosResponse<IResponse<IVideo[]>>> {
    return axiosIntance.get(
      `/videos/search/denided?page=${page}&search_query=${searchQuery}`,
    )
  }

  approve(id: string) {
    return axiosIntance.patch(`/videos/approve/${id}`)
  }

  deny(id: string) {
    return axiosIntance.patch(`/videos/deny/${id}`)
  }

  getById(id: string): Promise<AxiosResponse<IResponse<IVideo>>> {
    return axiosIntance.get(`/videos/${id}`)
  }

  delete(id: string): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.delete(`/videos/${id}`)
  }

  update(
    id: string,
    data: IUpdateUser,
  ): Promise<AxiosResponse<IResponse<undefined>>> {
    return axiosIntance.patch(`/videos/${id}`, data)
  }
}
