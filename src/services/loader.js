import NodeService from '@/services/node'

class LoaderService {
  async config() {
    const response = await NodeService.get('loader/autoconfigure')
    return response.data.network
  }
}

export default new LoaderService()
