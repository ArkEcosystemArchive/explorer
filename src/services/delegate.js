import ApiService from '@/services/api'
import block from '@/services/block'
import forging from '@/services/forging'
import store from '@/store'
import _ from 'lodash'

class DelegateService {
  async all() {
    const response = await ApiService.get('delegates')

    const requests = []

    for (
      let index = 1;
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

    return results
      .map(result => {
        return result.data
      })
      .reduce((a, b) => [...a, ...b])
  }

  async voters(publicKey, excludeLowBalances = true) {
    const response = await ApiService.get(`delegates/${publicKey}/voters`)

    let voters = response.data

    if (excludeLowBalances) {
      voters = _.filter(voters, account => {
        return account.balance > 0.1 * Math.pow(10, 8)
      })
    }

    return voters
  }

  async find(query) {
    const response = await ApiService.get(`delegates/${query}`)
    return response.data
  }

  async active() {
    const activeDelegates = store.getters['network/activeDelegates']
    const height = store.getters['network/height']

    const response = await ApiService.get('delegates', {
      params: {
        limit: activeDelegates
      }
    })

    return response.data.map(delegate => {
      delegate.forgingStatus = forging.status(
        delegate,
        height
      )

      return delegate
    })
  }

  async standby() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates', {
      params: {
        offset: activeDelegates,
        limit: activeDelegates
      }
    })

    return response.data
  }

  async forged() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
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

  async activeDelegatesCount() {
    const response = await ApiService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: 1
      }
    })
    return response.meta.totalCount
  }
}

export default new DelegateService()
