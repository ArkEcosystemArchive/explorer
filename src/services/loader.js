import ApiService from '@/services/api'

class LoaderService {
  async config() {
    const response = await ApiService.get('loader/autoconfigure')
    return response.data.network
  }
}

export default new LoaderService()
