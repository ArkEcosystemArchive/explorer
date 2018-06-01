import NodeService from '@/services/node'

class WalletService {
  async find(address) {
    const response = await NodeService.get('accounts', {
      params: {address}
    })
    return response.data.account
  }

  async vote(address) {
    const response = await NodeService.get('accounts/delegates', {
      params: {
        address
      }
    })

    const delegate = response.data.delegates[0]

    return delegate || false
  }

  async top(page = 1, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('accounts/top', {
      params: {
        orderBy: 'balance:desc',
        limit,
        offset
      }
    })
    return response.data.accounts
  }
}

export default new WalletService()
