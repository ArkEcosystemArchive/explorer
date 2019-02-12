import axios from 'axios'
import store from '@/store'

class NodeService {
  async get(url, config) {
    const server = store.getters['network/server']

    const response = await axios.get(`${server}/${url}`, config)

    if (!response.data.success) {
      return Promise.reject(new Error(`Error GET ${url} : ${JSON.stringify(response)}`))
    }
    return response
  }

  async getv2(url, config) {
    const server = store.getters['network/server']

    return axios.get(`${server}/v2/${url}`, config)
  }
}

export default new NodeService()
