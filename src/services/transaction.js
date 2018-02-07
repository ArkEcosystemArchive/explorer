import NodeService from '@/services/node'

class TransactionService {
  latest(limit = 25) {
    return NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit
      }
    }).then(response => response.data.transactions)
  }

  find(id) {
    return NodeService.get('transactions/get', {
      params: {
        id
      }
    }).then(response => response.data.transaction)
  }

  findByBlock(id) {
    return NodeService.get('transactions', {
      params: {
        blockId: id,
        limit: 25
      }
    }).then(response => response.data.transactions)
  }

  latestRegistrations() {
    return NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit: 5,
        type: 2
      }
    }).then(response => response.data.transactions)
  }

  latestVotes() {
    return NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit: 5,
        type: 3
      }
    }).then(response => response.data.transactions)
  }

  allByAddress(address, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    return NodeService.get('transactions', {
      params: {
        senderId: address,
        recipientId: address,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    }).then(response => response.data.transactions)
  }

  sentByAddress(senderId, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    return NodeService.get('transactions', {
      params: {
        senderId,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    }).then(response => response.data.transactions)
  }

  receivedByAddress(recipientId, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    return NodeService.get('transactions', {
      params: {
        recipientId,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    }).then(response => response.data.transactions)
  }

  sendByAddressCount(senderId) {
    return NodeService.get('transactions', {
      params: {
        senderId,
        limit: 1
      }
    }).then(response => response.data.count)
  }

  receivedByAddressCount(recipientId) {
    return NodeService.get('transactions', {
      params: {
        recipientId,
        limit: 1
      }
    }).then(response => response.data.count)
  }

  votes(senderId) {
    return NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit: 25,
        type: 3,
        senderId
      }
    }).then(response => response.data)
  }

  paginate(page, limit = 25) {
    const offset = (page > 1) ? (page - 1) * limit : 0

    return NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit,
        offset
      }
    }).then(response => response.data.transactions)
  }

  paginateByAddress(address, page = 1, limit = 25) {
    const offset = (page > 1) ? (page - 1) * limit : 0

    return NodeService.get('transactions', {
      params: {
        senderId: address,
        recipientId: address,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    }).then(response => response.data.transactions)
  }
}

export default new TransactionService()
