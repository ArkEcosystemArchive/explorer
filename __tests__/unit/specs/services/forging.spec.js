import ForgingService from '@/services/forging'
import store from '@/store'

const dummyDelegate = {
  username: 'dummyDelegate',
  address: 'ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ',
  publicKey:
  '02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b',
  votes: 190970317659243,
  rank: 1,
  blocks: {
    produced: 93305,
    last: {
      id: '9909051139056065485',
      height: 4781311,
      timestamp: {
        epoch: 54446328,
        unix: 1544547528,
        human: '2018-12-11T16:58:48.000Z'
      }
    }
  },
  production: {
    approval: 1.42
  },
  forged: {
    fees: 1149050072665,
    rewards: 22182000000000,
    total: 23331050072665
  }
}

describe('Services > Forging', () => {
  beforeAll(() => {
    store.dispatch('network/setActiveDelegates', 51)
  })

  it('should return the status for the given delegate', () => {
    const data = ForgingService.status(dummyDelegate, 4781312)
    expect(data).toBe(0)
  })

  it('should return the correct round', () => {
    expect(ForgingService.round(4781111)).toBe(93747 + 1)
  })

  it('should return the correct round, when modulo is 0', () => {
    expect(ForgingService.round(4781097)).toBe(93747)
  })

  it('should return 0 when given round is not a number', () => {
    expect(ForgingService.round('a')).toBe(0)
  })

  it('should return an object of forging stats for the given delegates', () => {
    const data = ForgingService.totals([
      { forgingStatus: 0 },
      { forgingStatus: 1 },
      { forgingStatus: 2 },
      { forgingStatus: 3 },
      { forgingStatus: 4 } // Unprocessable
    ])
    expect(data).toEqual({
      forging: 1,
      missedBlock: 1,
      notForging: 1,
      neverForged: 1,
      remainingBlocks: 51
    })
  })
})
