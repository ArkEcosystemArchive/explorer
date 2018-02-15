import NodeService from '@/services/node'
import block from '@/services/block'
import forging from '@/services/forging'
import store from '@/store'
import _ from 'lodash'

class DelegateService {
  all() {
    const activeDelegates = store.getters['network/activeDelegates']

    return NodeService.get('delegates', {
      params: {
        limit: activeDelegates
      }
    }).then(response => {
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

      return Promise.all(requests).then(results => {
        return results
          .map(result => {
            return result.data.delegates
          })
          .reduce((a, b) => [...a, ...b])
      })
    })
  }

  voters(publicKey) {
    return NodeService.get('delegates/voters', {
      params: {publicKey}
    }).then(response => {
      return _.orderBy(
        response.data.accounts.map(account => {
          account.balance = Number(account.balance)

          return account
        }),
        'balance',
        'desc'
      )
    })
  }

  findByUsername(username) {
    return NodeService.get('delegates/get', {
      params: {username}
    }).then(response => response.data.delegate)
  }

  find(publicKey) {
    return NodeService.get('delegates/get', {
      params: {publicKey}
    }).then(response => {
      const delegate = response.data.delegate

      if (!delegate) {
        return false
      }

      return NodeService.get(
        `delegates/forging/getForgedByAccount?generatorPublicKey=${
          delegate.publicKey
        }`
      ).then(response => {
        delegate.forged = Number(response.data.forged)

        return delegate
      })
    })
  }

  standby() {
    const activeDelegates = store.getters['network/activeDelegates']

    return NodeService.get('delegates', {params: {offset: activeDelegates}}).then(
      response => response.data.delegates
    )
  }

  nextForgers() {
    const activeDelegates = store.getters['network/activeDelegates']

    return NodeService.get('delegates/getNextForgers', {
      params: {limit: activeDelegates}
    }).then(response => response.data.delegates)
  }

  /**
   * @TODO - Remove this when Core 2.0 is released.
   */
  activeDelegates() {
    const activeDelegates = store.getters['network/activeDelegates']

    return NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: activeDelegates
      }
    })
      // Last Block (from last 100 Blocks)
      .then(response => {
        return block.latest(100).then(blocks => {
          return response.data.delegates.map(delegate => {
            const lastBlock = blocks.find(
              b => b.generatorPublicKey === delegate.publicKey
            )

            if (
              lastBlock !== undefined &&
                              lastBlock.hasOwnProperty('timestamp')
            ) {
              if (delegate.username !== 'bioly') {
                delegate.blocks = [lastBlock]
                delegate.blocksAt = lastBlock.timestamp
              }
            }

            return delegate
          })
        })
      })
      // Last Block (from specific delegate)
      .then(delegates => {
        const requests = []

        delegates.forEach((delegate) => requests.push(delegate.blocksAt ? delegate.blocks[0] : block.lastBlockByPublicKey(delegate.publicKey)))

        return Promise.all(requests).then(results => {
          return delegates.map((result, index) => {
            let lastBlock = results[index]

            result.blocks = [lastBlock]
            result.blocksAt = lastBlock ? lastBlock.timestamp : false

            return result
          })
        })
      })
      // Rounds
      .then(delegates => {
        return this.nextForgers().then(nextForgers => {
          return delegates.map(delegate => {
            const delegateIndex = nextForgers.findIndex(
              d => d === delegate.publicKey
            )

            delegate.forgingTime = delegateIndex * 8
            delegate.isRoundDelegate = delegateIndex !== -1

            return delegate
          })
        })
      })
      // Forging Status
      .then(delegates => {
        return block.height(status).then(height => {
          return delegates.map(delegate => {
            delegate.forgingStatus = forging.status(
              delegate,
              height
            )

            return delegate
          })
        })
      })
  }

  forged() {
    const activeDelegates = store.getters['network/activeDelegates']

    return NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: activeDelegates
      }
    }).then(response => {
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

      return Promise.all(requests).then(results => {
        return results.map((result, index) => {
          return {
            delegate: delegates[index].publicKey,
            forged: Number(result.data.forged)
          }
        })
      })
    })
  }

  activeDelegatesCount() {
    return NodeService.get('delegates', {
      params: {
        orderBy: 'rate:asc',
        limit: 1
      }
    }).then(response => response.data.totalCount)
  }
}

export default new DelegateService()
