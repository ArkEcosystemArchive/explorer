import axios from 'axios'
import store from '@/store'

class NodeService {
  get(url, config) {
    const server = store.getters['network/server']

    return axios
      .get(`${server}/${url}`, config)
      .then(
        response =>
          response.data.success ? response : Promise.reject(response)
      )
  }
}

export default new NodeService()
