import NodeService from '@/services/node'

class LoaderService {
  config() {
    return NodeService
      .get('loader/autoconfigure')
      .then(response => response.data.network)
  }
}

export default new LoaderService()
