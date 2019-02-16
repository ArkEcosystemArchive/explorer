import axios from 'axios'
import store from '@/store'

class ApiService {
  async get(url, config = {}) {
    const server = store.getters['network/server']

    const response = await axios.get(`${server}/${url}`, config)
    
    if (response.error) {
      return Promise.reject(new Error(`Error GET ${url} : ${JSON.stringify(response)}`))
    }

    return response.data
  }

  async post(url, data = {}, config = {}) {
    config.headers || (config.headers = {
      'Content-Type': 'application/json'
    })

    const server = store.getters['network/server']

    const response = await axios.post(`${server}/${url}`, data, config)

    if (response.error) {
      return Promise.reject(new Error(`Error POST ${url} : ${JSON.stringify(response)}`))
    }

    return response.data
  }
}

export default new ApiService()
