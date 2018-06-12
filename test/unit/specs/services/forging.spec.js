import forgingService from '@/services/forging'
import store from '@/store'

describe('Forging Service', () => {

  beforeAll(() => {
    store.dispatch('network/setActiveDelegates', 51)
  })

  it('should return the status for the given delegate', () => {
    const data = forgingService.status(delegates, 4781312)
    // TODO: test this
    // Note: this doesn't test all possible paths, but the function will be removed with V2 anyway
  })

  it('should return a correct epoch stamp', () => {
    const data = forgingService.epochStamp(123456789)
    expect(data).toEqual(new Date('2021-02-17T10:33:09.000Z'))
  })

  it('should return the correct round', () => {
    expect(forgingService.round(4781111)).toBe(93747 + 1)
  })

  it('should return the correct round, when modulo is 0', () => {
    expect(forgingService.round(4781097)).toBe(93747)
  })

  it('should return 0 when given round is not a number', () => {
    expect(forgingService.round('a')).toBe(0)
  })

  it('should return an object of forging stats for the given delegates', () => {
    const data = forgingService.totals([
      { forgingStatus: { code: 0 }},
      { forgingStatus: { code: 1 }},
      { forgingStatus: { code: 2 }},
      { forgingStatus: { code: 3 }},
      { forgingStatus: { code: 4 }},
      { forgingStatus: { code: 5 }},
      { forgingStatus: { code: 6 }} // Unprocessable
    ])
    expect(data).toEqual({
      forging: 2,
      missedBlock: 2,
      notForging: 2,
      awaitingSlot: 2,
      unprocessed: 1
    })
  })
})