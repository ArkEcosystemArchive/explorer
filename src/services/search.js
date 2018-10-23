import ApiService from '@/services/api'

class SearchService {
  async findByAddress(address) {
    const response = await ApiService.get('accounts', {params: {address}})
    return response.data
  }

  async findByUsername(username) {
    const response = await ApiService.get('delegates/get', {params: {username}})
    return response.data
  }

  async findByPublicKey(publicKey) {
    const response = await ApiService.get('delegates/get', {params: {publicKey}})
    return response.data
  }

  async findByBlockId(id) {
    const response = await ApiService.get('blocks/get', {params: {id}})
    return response.data
  }

  async findByTransactionId(id) {
    const response = await ApiService.get('transactions/get', {params: {id}})
    return response.data
  }
}

export default new SearchService()
