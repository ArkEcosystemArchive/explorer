import store from '@/store'

const ForgeStatus = Object.freeze({
  FORGING: 0,
  MISSING: 1,
  NOT_FORGING: 2,
  AWAITING_SLOT: 3,
  MISSED_AWAITING_SLOT: 4,
  AWAITING_STATUS: 5
})

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

    if (status.awaitingSlot === ForgeStatus.FORGING) {
      // Forged block in current round
      status.code = ForgeStatus.FORGING
    } else if (!delegate.isRoundDelegate && status.awaitingSlot === ForgeStatus.MISSING) {
      // Missed block in current round
      status.code = ForgeStatus.MISSING
    } else if (!delegate.isRoundDelegate && status.awaitingSlot > ForgeStatus.MISSING) {
      // Missed block in current and last round = not forging
      status.code = ForgeStatus.NOT_FORGING
    } else if (status.awaitingSlot === ForgeStatus.MISSING) {
      // Awaiting slot, but forged in last round
      status.code = ForgeStatus.AWAITING_SLOT
    } else if (status.awaitingSlot === ForgeStatus.NOT_FORGING) {
      // Awaiting slot, but missed block in last round
      status.code = ForgeStatus.MISSED_AWAITING_SLOT
    } else if (!status.blockAt && !status.updatedAt) {
      // Awaiting status or unprocessed
      status.code = ForgeStatus.AWAITING_STATUS
      // For delegates which not forged a single block yet (statuses FORGING, AWAITING_SLOT, AWAITING_STATUS not apply here)
    } else if (!status.blockAt && status.updatedAt) {
      if (!delegate.isRoundDelegate && delegate.missedblocks === ForgeStatus.MISSING) {
        // Missed block in current round
        status.code = ForgeStatus.MISSING
      } else if (delegate.missedblocks > 1) {
        // Missed more than 1 block = not forging
        status.code = ForgeStatus.NOT_FORGING
      } else if (delegate.missedblocks === ForgeStatus.MISSING) {
        // Missed block in previous round
        status.code = ForgeStatus.MISSED_AWAITING_SLOT
      }
    } else {
      // Not Forging
      status.code = ForgeStatus.NOT_FORGING
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
        case ForgeStatus.FORGING:
        case ForgeStatus.AWAITING_SLOT:
        {
          forging++
          break
        }
        case ForgeStatus.MISSING:
        case ForgeStatus.MISSED_AWAITING_SLOT:
        {
          missedBlock++
          break
        }
        case ForgeStatus.NOT_FORGING:
        case ForgeStatus.AWAITING_STATUS:
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
        case ForgeStatus.AWAITING_SLOT:
        case ForgeStatus.MISSED_AWAITING_SLOT:
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
