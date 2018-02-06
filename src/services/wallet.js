import NodeService from '@/services/node'

class WalletService {
  find(address) {
    return NodeService.get('accounts', {
      params: {address}
    }).then(response => response.data.account)
  }

  vote(address) {
    return NodeService.get('accounts/delegates', {
      params: {
        address
      }
    }).then(response => {
      const delegate = response.data.delegates[0]

      return delegate || false
    })
  }

  top(page = 1, perPage = 25) {
    const offset = page > 1 ? page * perPage : 0

    return NodeService.get('accounts/top', {
      params: {
        orderBy: 'balance:desc',
        limit: perPage,
        offset
      }
    }).then(response => response.data.accounts)
  }
}

export default new WalletService()
