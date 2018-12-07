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

  async standby() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates', {
      params: {
        offset: activeDelegates
      }
    })
    return response.data
  }

  async nextForgers() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates/getNextForgers', {
      params: {limit: activeDelegates}
    })
    return response.data.delegates
  }

  /**
   * @TODO - Remove this when Core 2.0 is released.
   */
  async activeDelegates() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await ApiService.get('delegates', {
      params: {
        orderBy: 'rank:desc',
        limit: activeDelegates
      }
    })
    const delegateCount = response.data.totalCount

    // Last Block (from last 100 Blocks)
    const blocks = await block.latest(100)
    const lastBlocksFetched = JSON.parse(sessionStorage.getItem('lastBlocksFetched') || '[]')
    sessionStorage.setItem('lastBlocksFetched', JSON.stringify(blocks))

    const delegates = response.data.map(delegate => {
      const lastBlock = blocks.find(
        b => b.generatorPublicKey === delegate.publicKey
      )

      if (lastBlock !== undefined && lastBlock.hasOwnProperty('timestamp')) {
        delegate.blocks = [lastBlock]
        delegate.blocksAt = lastBlock.timestamp
      }

      return delegate
    })

    // Last Block (from specific delegate)
    const requests = []
    const lastDelegatesLastBlock = JSON.parse(sessionStorage.getItem('lastDelegatesLastBlock') || '[]')

    delegates.forEach((delegate) => {
      if (delegate.blocksAt) {
        // we already have the delegate's last block from looking at the last 100 blocks
        requests.push(delegate.blocks[0])
      } else if (lastBlocksFetched.length && lastBlocksFetched[0].height >= blocks[blocks.length - 1].height) {
        // the delegate's last block is not in the last 100 blocks but we might have saved it in sessionStorage
        // only valid if there is no 'hole' between the last blocks fetched and the current ones
        const lastDel = lastDelegatesLastBlock.find(del => del.publicKey === delegate.publicKey)
        if (lastDel) { requests.push(lastDel.blocks[0]) } else { requests.push(block.lastBlockByPublicKey(delegate.publicKey)) }
      } else {
        // last option : make a specific server request to get the delegate's last block
        requests.push(block.lastBlockByPublicKey(delegate.publicKey))
      }
    })

    const results = await Promise.all(requests)
    const delegatesLastBlock = delegates.map((result, index) => {
      let lastBlock = results[index]

      result.blocks = [lastBlock]
      result.blocksAt = lastBlock ? lastBlock.timestamp : false

      return result
    })
    sessionStorage.setItem('lastDelegatesLastBlock', JSON.stringify(delegatesLastBlock))

    // Rounds
    const nextForgers = await this.nextForgers()
    const delegatesRounds = delegatesLastBlock.map(delegate => {
      const delegateIndex = nextForgers.findIndex(
        d => d === delegate.publicKey
      )

      delegate.forgingTime = delegateIndex * 8
      delegate.isRoundDelegate = delegateIndex !== -1

      return delegate
    })

    // Forging Status
    const height = await block.height()
    return { delegateCount: delegateCount,
      delegates: delegatesRounds.map(delegate => {
        delegate.forgingStatus = forging.status(
          delegate,
          height
        )

        return delegate
      }) }
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
