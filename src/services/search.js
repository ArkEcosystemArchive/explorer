import NodeService from '@/services/node'

class SearchService {
  async findByAddress(address) {
    const response = await NodeService.get('accounts', {params: {address}})
    return response.data
  }

  async findByUsername(username) {
    const response = await NodeService.get('delegates/get', {params: {username}})
    return response.data
  }

  async findByPublicKey(publicKey) {
    const response = await NodeService.get('delegates/get', {params: {publicKey}})
    return response.data
  }

  async findByBlockId(id) {
    const response = await NodeService.get('blocks/get', {params: {id}})
    return response.data
  }

  async findByTransactionId(id) {
    const response = await NodeService.get('transactions/get', {params: {id}})
    return response.data
  }
}

export default new SearchService()
