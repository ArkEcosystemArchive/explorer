import NodeService from '@/services/node'

class SearchService {
  async findByAddress(address) {
    const response = await NodeService.get('accounts', {params: {address}})
    return response.data.success ? response.data : false
  }

  async findByUsername(username) {
    const response = await NodeService.get('delegates/get', {params: {username}})
    return response.data.success ? response.data : false
  }

  async findByPublicKey(publicKey) {
    const response = await NodeService.get('delegates/get', {params: {publicKey}})
    return response.data.success ? response.data : false
  }

  async findByBlockId(id) {
    const response = await NodeService.get('blocks/get', {params: {id}})
    return response.data.success ? response.data : false
  }

  async findByTransactionId(id) {
    const response = await NodeService.get('transactions/get', {params: {id}})
    return response.data.success ? response.data : false
  }
}

export default new SearchService()
