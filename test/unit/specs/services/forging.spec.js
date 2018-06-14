import forgingService from '@/services/forging'
import store from '@/store'

const dummyBlock = {
  'id': '9680842915822578693', 'version': 0, 'timestamp': 38739832, 'height': 4781312, 'previousBlock': '2930936246427877286', 'numberOfTransactions': 0, 'totalAmount': 0, 'totalFee': 0, 'reward': 200000000, 'payloadLength': 0, 'payloadHash': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'generatorPublicKey': '03331b3bdebd082d0c43d08b20a687c7b55adde6e39766d96bf6188d6646330aef', 'generatorId': 'AbkG2erJoFRFK4H1VuVkb9Mgx4cA1oSG43', 'blockSignature': '3045022100aab1299e2e1e046e00755ac8541506c2ac253d2337341a3f8b2f42af332bb5b502202f5ff2dcd4fd63b51b74509772192aab0d2d5a01f10581141256a9e5974274b1', 'confirmations': 1, 'totalForged': '200000000'
}

const dummyDelegate = {
  username: 'dummyDelegate',
  address: 'ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ',
  publicKey:
  '02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b',
  vote: '190970317659243',
  producedblocks: 93305,
  missedblocks: 459,
  rate: 1,
  approval: 1.42,
  productivity: 99.51,
  blocks: [ dummyBlock ],
  blocksAt: 38737224,
  forgingTime: 168,
  isRoundDelegate: true,
  status: '3:1'
}

describe('Forging Service', () => {
  beforeAll(() => {
    store.dispatch('network/setActiveDelegates', 51)
  })

  it('should return the status for the given delegate', () => {
    const data = forgingService.status(dummyDelegate, 4781312)
    expect(Object.keys(data).sort()).toEqual([
      'updatedAt',
      'lastBlock',
      'blockAt',
      'networkRound',
      'delegateRound',
      'awaitingSlot',
      'code'
    ].sort())
    expect(Object.keys(data.lastBlock).sort()).toEqual([
      'id',
      'version',
      'height',
      'previousBlock',
      'numberOfTransactions',
      'totalAmount',
      'totalFee',
      'reward',
      'timestamp',
      'payloadLength',
      'payloadHash',
      'generatorPublicKey',
      'generatorId',
      'blockSignature',
      'confirmations',
      'totalForged'
    ].sort())
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
      { forgingStatus: { code: 0 } },
      { forgingStatus: { code: 1 } },
      { forgingStatus: { code: 2 } },
      { forgingStatus: { code: 3 } },
      { forgingStatus: { code: 4 } },
      { forgingStatus: { code: 5 } },
      { forgingStatus: { code: 6 } } // Unprocessable
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
