import store from '@/store'

/**
 * @TODO - Remove this when Core 2.0 is released.
 */
class ForgingService {
  status(delegate, height) {
    const status = {
      updatedAt: delegate.blocksAt
    }

    if (delegate.blocksAt && delegate.blocks.length > 0) {
      status.lastBlock = delegate.blocks[0]
      status.blockAt = this.epochStamp(status.lastBlock.timestamp)
      status.networkRound = this.round(height)
      status.delegateRound = this.round(status.lastBlock.height)
      status.awaitingSlot = status.networkRound - status.delegateRound
    } else {
      status.lastBlock = null
    }

    if (status.awaitingSlot === 0) {
      // Forged block in current round
      status.code = 0
    } else if (!delegate.isRoundDelegate && status.awaitingSlot === 1) {
      // Missed block in current round
      status.code = 1
    } else if (!delegate.isRoundDelegate && status.awaitingSlot > 1) {
      // Missed block in current and last round = not forging
      status.code = 2
    } else if (status.awaitingSlot === 1) {
      // Awaiting slot, but forged in last round
      status.code = 3
    } else if (status.awaitingSlot === 2) {
      // Awaiting slot, but missed block in last round
      status.code = 4
    } else if (!status.blockAt && !status.updatedAt) {
      // Awaiting status or unprocessed
      status.code = 5
      // For delegates which not forged a signle block yet (statuses 0,3,5 not apply here)
    } else if (!status.blockAt && status.updatedAt) {
      if (!delegate.isRoundDelegate && delegate.missedblocks === 1) {
        // Missed block in current round
        status.code = 1
      } else if (delegate.missedblocks > 1) {
        // Missed more than 1 block = not forging
        status.code = 2
      } else if (delegate.missedblocks === 1) {
        // Missed block in previous round
        status.code = 4
      }
    } else {
      // Not Forging
      status.code = 2
    }

    delegate.status = [status.code, delegate.rate].join(':')

    return status
  }

  epochStamp(d) {
    return new Date((((Date.UTC(2017, 2, 21, 13, 0, 0, 0) / 1000) + d) * 1000))
  }

  round(height) {
    if (isNaN(height)) return 0

    const activeDelegates = store.getters['network/activeDelegates']

    return Math.floor(height / activeDelegates) + (height % activeDelegates > 0 ? 1 : 0)
  }

  totals(delegates) {
    let forging = 0
    let missedBlock = 0
    let notForging = 0
    let awaitingSlot = 0
    let unprocessed = 0

    delegates.forEach(element => {
      switch (element.forgingStatus.code) {
        case 0:
        case 3:
        {
          forging++
          break
        }
        case 1:
        case 4:
        {
          missedBlock++
          break
        }
        case 2:
        case 5:
        {
          notForging++
          break
        }
        default:
        {
          unprocessed++
          break
        }
      }
    })

    delegates.forEach(element => {
      switch (element.forgingStatus.code) {
        case 3:
        case 4:
        {
          awaitingSlot++
          break
        }
        default:
        {
          break
        }
      }
    })

    return {
      forging,
      missedBlock,
      notForging,
      awaitingSlot,
      unprocessed
    }
  }
}

export default new ForgingService()
