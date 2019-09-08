import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { IApiResponse, IApiResponseData } from '../interfaces';

class ApiService {
  async get (url: string, config: AxiosRequestConfig = {}): Promise<IApiResponseData | undefined> {
    const server = store.getters['network/server']

    const response: IApiResponse = await axios.get(`${server}/${url}`, config)

    if (response.error) {
      return Promise.reject(new Error(`Error GET ${url} : ${JSON.stringify(response)}`))
    }

    return response.data
  }

  async post (url: string, data = {}, config: AxiosRequestConfig = {}): Promise<IApiResponseData | undefined> {
    config.headers || (config.headers = {
      'Content-Type': 'application/json'
    })

    const server = store.getters['network/server']

    const response: IApiResponse = await axios.post(`${server}/${url}`, data, config)

    if (response.error) {
      return Promise.reject(new Error(`Error POST ${url} : ${JSON.stringify(response)}`))
    }

    return response.data
  }
}

export default new ApiService()
