import ApiService from '@/services/api'
import DelegateService from '@/services/delegate'

class WalletService {
  async find(address) {
    const response = await ApiService.get(`wallets/${address}`)
    return response.data
  }

  async allByAddress(address, page = 1, limit = 25) {
    const response = await ApiService.get(`wallets/${address}/transactions`, {
      params: {
        page,
        limit
      }
    })
    return response.data
  }

  async sentByAddress(address, page = 1, limit = 25) {
    const response = await ApiService.get(`wallets/${address}/transactions/sent`, {
      params: {
        page,
        limit
      }
    })
    return response.data
  }

  async receivedByAddress(address, page = 1, limit = 25) {
    const response = await ApiService.get(`wallets/${address}/transactions/received`, {
      params: {
        page,
        limit
      }
    })
    return response.data
  }

  async sentByAddressCount(senderId) {
    const response = await ApiService.get('transactions', {
      params: {
        senderId,
        limit: 1
      }
    })
    return response.meta.totalCount
  }

  async receivedByAddressCount(recipientId) {
    const response = await ApiService.get('transactions', {
      params: {
        recipientId,
        limit: 1
      }
    })
    return response.meta.totalCount
  }

  async vote(address) {
    const response = await ApiService.get(`wallets/${address}/votes`, {
      params: {
        limit: 1
      }
    })

    const votes = response.data

    let delegate = null

    if (votes.length) {
      const lastVote = votes[0].asset.votes[0]

      if (lastVote.charAt(0) === '-') {
        return false
      }

      delegate = await DelegateService.find(lastVote.substring(1))
    }

    return delegate || false
  }

  async top(page = 1, limit = 25) {
    const response = await ApiService.get('wallets/top', {
      params: {
        page,
        limit
      }
    })
    return response.data
  }
}

export default new WalletService()
