import NodeService from '@/services/node'
import block from '@/services/block'
import forging from '@/services/forging'
import store from '@/store'
import _ from 'lodash'

class DelegateService {
  async all() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates', {
      params: {
        limit: activeDelegates
      }
    })

    const requests = []

    for (
      let index = 0;
      index < Math.ceil(response.data.totalCount / activeDelegates);
      index++
    ) {
      requests.push(
        NodeService.get('delegates', {
          params: {
            limit: activeDelegates,
            offset: index * activeDelegates
          }
        })
      )
    }

    const results = await Promise.all(requests)

    return results
      .map(result => {
        return result.data.delegates
      })
      .reduce((a, b) => [...a, ...b])
  }

  async voters(publicKey) {
    const response = await NodeService.get('delegates/voters', {
      params: {publicKey}
    })
    return _.orderBy(
      response.data.accounts.map(account => {
        account.balance = Number(account.balance)

        return account
      }),
      'balance',
      'desc'
    )
  }

  async findByUsername(username) {
    const response = await NodeService.get('delegates/get', {
      params: {username}
    })
    return response.data.delegate
  }

  async find(publicKey) {
    const delegateResponse = await NodeService.get('delegates/get', {
      params: {publicKey}
    })
    const delegate = delegateResponse.data.delegate

    if (!delegate) {
      return false
    }

    const response = await NodeService.get(
      `delegates/forging/getForgedByAccount?generatorPublicKey=${
        delegate.publicKey
      }`
    )
    delegate.forged = Number(response.data.forged)

    return delegate
  }

  async standby() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates', {params: {offset: activeDelegates}})
    return response.data.delegates
  }

  async nextForgers() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates/getNextForgers', {
      params: {limit: activeDelegates}
    })
    return response.data.delegates
  }

  /**
   * @TODO - Remove this when Core 2.0 is released.
   */
  async activeDelegates() {
    const activeDelegates = store.getters['network/activeDelegates']

    const delegateResponse = await NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: activeDelegates
      }
    })

    // Last Block (from last 100 Blocks)
    const blocks = await block.latest(100)
    const delegates = delegateResponse.data.delegates.map(delegate => {
      const lastBlock = blocks.find(b => b.generatorPublicKey === delegate.publicKey)
      if (lastBlock !== undefined && lastBlock.hasOwnProperty('timestamp')) {
          delegate.blocks = [lastBlock]
          delegate.blocksAt = lastBlock.timestamp
      }
      return delegate
    })

    // Last Block (from specific delegate)
    const requests = []
    delegates.forEach((delegate) => requests.push(delegate.blocksAt ? delegate.blocks[0] : block.lastBlockByPublicKey(delegate.publicKey)))
    const results = await Promise.all(requests)
    delegates.map((result, index) => {
      let lastBlock = results[index]

      result.blocks = [lastBlock]
      result.blocksAt = lastBlock ? lastBlock.timestamp : false

      return result
    })

    // Rounds
    const nextForgers = await this.nextForgers()
    delegates.map(delegate => {
      const delegateIndex = nextForgers.findIndex(
        d => d === delegate.publicKey
      )

      delegate.forgingTime = delegateIndex * 8
      delegate.isRoundDelegate = delegateIndex !== -1

      return delegate
    })

    // Forging Status
    const height = await block.height(status)
    delegates.map(delegate => {
      delegate.forgingStatus = forging.status(
        delegate,
        height
      )

      return delegate
    })

    return delegates
  }

  async forged() {
    const activeDelegates = store.getters['network/activeDelegates']

    const response = await NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: activeDelegates
      }
    })

    const delegates = response.data.delegates
    const requests = []

    delegates.forEach(delegate => {
      requests.push(
        NodeService.get('delegates/forging/getForgedByAccount', {
          params: {
            generatorPublicKey: delegate.publicKey
          }
        })
      )
    })

    const results = await Promise.all(requests)

    return results.map((result, index) => {
      return {
        delegate: delegates[index].publicKey,
        forged: Number(result.data.forged)
      }
    })
  }

  async activeDelegatesCount() {
    const response = await NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: 1
      }
    })
    return response.data.totalCount
  }
}

export default new DelegateService()
