import NodeService from '@/services/node'

class TransactionService {
  async latest(limit = 25) {
    const response = await NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit
      }
    })
    return response.data.transactions
  }

  async find(id) {
    const response = await NodeService.get('transactions/get', {
      params: {
        id
      }
    })
    return response.data.transaction
  }

  async findByBlock(id, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('transactions', {
      params: {
        blockId: id,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    })
    return response.data.transactions
  }

  async latestRegistrations() {
    const response = await NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit: 5,
        type: 2
      }
    })
    return response.data.transactions
  }

  async latestVotes() {
    const response = await NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit: 5,
        type: 3
      }
    })
    return response.data.transactions
  }

  async allByAddress(address, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('transactions', {
      params: {
        senderId: address,
        recipientId: address,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    })
    return response.data.transactions
  }

  async sentByAddress(senderId, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('transactions', {
      params: {
        senderId,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    })
    return response.data.transactions
  }

  async receivedByAddress(recipientId, page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('transactions', {
      params: {
        recipientId,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    })
    return response.data.transactions
  }

  async sentByAddressCount(senderId) {
    const response = await NodeService.get('transactions', {
      params: {
        senderId,
        limit: 1
      }
    })
    return response.data.count
  }

  async receivedByAddressCount(recipientId) {
    const response = await NodeService.get('transactions', {
      params: {
        recipientId,
        limit: 1
      }
    })
    return response.data.count
  }

  async findByBlockCount(blockId) {
    const response = await NodeService.get('transactions', {
      params: {
        blockId,
        limit: 1
      }
    })
    return response.data.count
  }

  async votes(senderId) {
    const response = await NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit: 25,
        type: 3,
        senderId
      }
    })
    return response.data
  }

  async paginate(page, limit = 25) {
    const offset = (page > 1) ? (page - 1) * limit : 0

    const response = await NodeService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit,
        offset
      }
    })
    return response.data.transactions
  }

  async paginateByAddress(address, page = 1, limit = 25) {
    const offset = (page > 1) ? (page - 1) * limit : 0

    const response = await NodeService.get('transactions', {
      params: {
        senderId: address,
        recipientId: address,
        limit,
        offset,
        orderBy: 'timestamp:desc'
      }
    })
    return response.data.transactions
  }
}

export default new TransactionService()
