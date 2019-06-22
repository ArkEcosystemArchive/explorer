import store from '@/store'

const ForgeStatus = Object.freeze({
  FORGING: 0,
  MISSING: 1,
  NOT_FORGING: 2,
  NEVER_FORGED: 3
})

class ForgingService {
  status (delegate, height) {
    let forgingStatus

    if (delegate.blocks.last === undefined) {
      forgingStatus = ForgeStatus.NEVER_FORGED
    } else {
      const networkRound = this.round(height)
      const lastBlockRound = this.round(delegate.blocks.last.height)
      const roundDelta = networkRound - lastBlockRound

      switch (roundDelta) {
        case 0:
        case 1:
        {
          forgingStatus = ForgeStatus.FORGING
          break
        }
        case 2:
        {
          forgingStatus = ForgeStatus.MISSING
          break
        }
        default:
        {
          forgingStatus = ForgeStatus.NOT_FORGING
          break
        }
      }
    }

    return forgingStatus
  }

  round (height) {
    if (isNaN(height)) {
      return 0
    }

    const activeDelegates = store.getters['network/activeDelegates']

    return Math.floor(height / activeDelegates) + (height % activeDelegates > 0 ? 1 : 0)
  }

  totals (delegates) {
    let forging = 0
    let missedBlock = 0
    let notForging = 0
    let neverForged = 0

    const height = store.getters['network/height']
    const activeDelegates = store.getters['network/activeDelegates']

    const remainingBlocks = activeDelegates - (height % activeDelegates) || activeDelegates

    delegates.forEach(delegate => {
      switch (delegate.forgingStatus) {
        case ForgeStatus.FORGING:
        {
          forging++
          break
        }
        case ForgeStatus.MISSING:
        {
          missedBlock++
          break
        }
        case ForgeStatus.NOT_FORGING:
        {
          notForging++
          break
        }
        case ForgeStatus.NEVER_FORGED:
        {
          neverForged++
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
      neverForged,
      remainingBlocks
    }
  }
}

export default new ForgingService()
