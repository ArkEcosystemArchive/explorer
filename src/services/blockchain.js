import ApiService from '@/services/api'

class BlockchainService {
  async height() {
    const response = await ApiService.get('blockchain')
    return response.block.height
  }

  async supply() {
    const response = await ApiService.get('blockchain')
    return response.supply
  }
}

export default new BlockchainService()
