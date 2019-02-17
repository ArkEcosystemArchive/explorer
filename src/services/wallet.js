import ApiService from '@/services/api'
import DelegateService from '@/services/delegate'

class WalletService {
  async find(address) {
    const response = await ApiService.get(`wallets/${address}`)
    return response.data
  }

  async top(page = 1, limit = 25) {
    const response = await ApiService.get('wallets/top', {
      params: {
        page,
        limit
      }
    })
    return response
  }
}

export default new WalletService()
