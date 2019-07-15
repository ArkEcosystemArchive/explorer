import ApiService from '@/services/api'

class TransactionService {
  async latest (limit = 25) {
    const response = await ApiService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit
      }
    })

    return response.data
  }

  async find (id) {
    const response = await ApiService.get(`transactions/${id}`)
    return response.data
  }

  async filterByType (page, type, limit = 25) {
    const params = {
      orderBy: 'timestamp:desc',
      page,
      limit
    }

    if (type !== -1) {
      params.type = type
    }

    const response = await ApiService.get('transactions', {
      params: params
    })

    return response
  }

  async byBlock (id, page = 1, limit = 25) {
    const response = await ApiService.get(`blocks/${id}/transactions`, {
      params: {
        orderBy: 'timestamp:desc',
        page,
        limit
      }
    })

    return response
  }

  async allByAddress (address, page = 1, limit = 25) {
    const response = await ApiService.get(`wallets/${address}/transactions`, {
      params: {
        orderBy: 'timestamp:desc',
        page,
        limit
      }
    })

    return response
  }

  async sentByAddress (address, page = 1, limit = 25) {
    const response = await ApiService.get(`wallets/${address}/transactions/sent`, {
      params: {
        orderBy: 'timestamp:desc',
        page,
        limit
      }
    })

    return response
  }

  async receivedByAddress (address, page = 1, limit = 25) {
    const response = await ApiService.get(`wallets/${address}/transactions/received`, {
      params: {
        orderBy: 'timestamp:desc',
        page,
        limit
      }
    })

    return response
  }

  async sentByAddressCount (senderId) {
    const response = await ApiService.get('transactions', {
      params: {
        senderId,
        limit: 1
      }
    })
    return response.meta.totalCount
  }

  async receivedByAddressCount (recipientId) {
    const response = await ApiService.get('transactions', {
      params: {
        recipientId,
        limit: 1
      }
    })
    return response.meta.totalCount
  }
}

export default new TransactionService()
