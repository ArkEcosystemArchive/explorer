import { ApiService, ForgingService, WalletService } from '@/services'
import store from '@/store'

class DelegateService {
  async all () {
    const response = await ApiService.get('delegates', {
      params: {
        page: 1
      }
    })

    const requests = []

    for (
      let index = 2;
      index <= response.meta.pageCount;
      index++
    ) {
      requests.push(
        ApiService.get('delegates', {
          params: {
            page: index
          }
        })
      )
    }

    const results = await Promise.all(requests)

    return response.data.concat([].concat(...results.map(result => result.data)))
  }

  async voters (query, page, limit = 25) {
    const response = await ApiService.get(`delegates/${query}/voters`, {
      params: {
        page,
        limit
      }
    })

    return response
  }

  async voterCount (publicKey, excludeLowBalances = true) {
    const response = await WalletService.search({
      vote: publicKey,
      balance: {
        from: excludeLowBalances ? 1e7 : 0
      }
    }, {
      params: {
        limit: 1
      }
    })

    return response.meta.totalCount
  }

  async find (query) {
    const response = await ApiService.get(`delegates/${query}`)
    return response.data
  }

  async active () {
    const activeDelegates = store.getters['network/activeDelegates']
    const height = store.getters['network/height']

    const response = await ApiService.get('delegates', {
      params: {
        limit: activeDelegates
      }
    })

    return response.data.map(delegate => {
      delegate.forgingStatus = ForgingService.status(
        delegate,
        height
      )

      return delegate
    })
  }

  async standby () {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates', {
      params: {
        offset: activeDelegates,
        limit: activeDelegates
      }
    })

    return response.data
  }

  async forged () {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates', {
      params: {
        limit: activeDelegates
      }
    })

    return response.data.map((delegate, index) => {
      return {
        delegate: delegate.publicKey,
        forged: Number(delegate.forged.total)
      }
    })
  }

  async activeDelegatesCount () {
    const response = await ApiService.get('delegates', {
      params: {
        limit: 1
      }
    })
    return response.meta.totalCount
  }
}

export default new DelegateService()
