import axios from 'axios'
import store from '@/store'

class NodeService {
  async get(url, config) {
    const server = store.getters['network/server']

    try {
    	const response = await axios.get(`${server}/${url}`, config)
    	if (response.data.success) {
    		return response
    	} else {
    		throw new Error(response.data.error)
    	}
    } catch (error) {
    	throw new Error(error)
    }
  }
}

export default new NodeService()
