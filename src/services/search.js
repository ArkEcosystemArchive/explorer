import NodeService from '@/services/node'

class SearchService {
  findByAddress(address) {
    return NodeService
      .get('accounts', {params: {address}})
      .then(response => response.data.success ? response.data : false)
  }

  findByUsername(username) {
    return NodeService
      .get('delegates/get', {params: {username}})
      .then(response => response.data.success ? response.data : false)
  }

  findByPublicKey(publicKey) {
    return NodeService
      .get('delegates/get', {params: {publicKey}})
      .then(response => response.data.success ? response.data : false)
  }

  findByBlockId(id) {
    return NodeService
      .get('blocks/get', {params: {id}})
      .then(response => response.data.success ? response.data : false)
  }

  findByTransactionId(id) {
    return NodeService
      .get('transactions/get', {params: {id}})
      .then(response => response.data.success ? response.data : false)
  }
}

export default new SearchService()
