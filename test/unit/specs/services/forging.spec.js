import forgingService from '@/services/forging'
import store from '@/store'

const testDelegate = {
  'username': 'testDelegate',
  'address': 'ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ',
  'publicKey': '02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b',
  'vote': '190970917659243',
  'producedblocks': 93309,
  'missedblocks': 459,
  'rate': 1,
  'approval': 1.42,
  'productivity':99.51
}

const dummyBlock = {
  "id":"9680842915822578693","version":0,"timestamp":38739832,"height":4781312,"previousBlock":"2930936246427877286","numberOfTransactions":0,"totalAmount":0,"totalFee":0,"reward":200000000,"payloadLength":0,"payloadHash":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","generatorPublicKey":"03331b3bdebd082d0c43d08b20a687c7b55adde6e39766d96bf6188d6646330aef","generatorId":"AbkG2erJoFRFK4H1VuVkb9Mgx4cA1oSG43","blockSignature":"3045022100aab1299e2e1e046e00755ac8541506c2ac253d2337341a3f8b2f42af332bb5b502202f5ff2dcd4fd63b51b74509772192aab0d2d5a01f10581141256a9e5974274b1","confirmations":1,"totalForged":"200000000"
}

const delegates = [
{ username: 'arkpool',
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
},
{ 
  username: 'biz_classic',
  address: 'AKdr5d9AMEnsKYxpDcoHdyyjSCKVx3r9Nj',
  publicKey:
  '020431436cf94f3c6a6ba566fe9e42678db8486590c732ca6c3803a10a86f50b92',
  vote: '181608548844286',
  producedblocks: 73330,
  missedblocks: 243,
  rate: 2,
  approval: 1.35,
  productivity: 99.67,
  blocks: [ dummyBlock ],
  blocksAt: 38736968,
  forgingTime: 136,
  isRoundDelegate: true,
  status: '3:2'
},
{ 
  username: 'bioly',
  address: 'AbUdMhk96FbzxH7vDYAwdyqUELmLopZV5x',
  publicKey:
  '02c0b645f19ab304d25aae3add139edd9f6ca9fd0d98e57a808100de0e93832181',
  vote: '177814442437660',
  producedblocks: 93714,
  missedblocks: 359,
  rate: 3,
  approval: 1.32,
  productivity: 99.62,
  blocks: [ dummyBlock ],
  blocksAt: 38737176,
  forgingTime: 120,
  isRoundDelegate: true,
  status: '3:3'
},
{ 
  username: 'arkoar.group',
  address: 'AHnX1opqCQVrFUt2uvF88d5ZCQVxNyANeG',
  publicKey:
  '02632c04e59b3f9cf6e0e5e4a72e034f29c69a68625d5fd3a9ff12fb4f23b868e6',
  vote: '170416798854555',
  producedblocks: 16538,
  missedblocks: 36,
  rate: 4,
  approval: 1.27,
  productivity: 99.78,
  blocks: [ dummyBlock ],
  blocksAt: 38736896,
  forgingTime: 144,
  isRoundDelegate: true,
  status: '3:4'
},
{
  username: 'dutchdelegate',
  address: 'AZse3vk8s3QEX1bqijFb21aSBeoF6vqLYE',
  publicKey:
  '0218b77efb312810c9a549e2cc658330fcc07f554d465673e08fa304fa59e67a0a',
  vote: '168138984987262',
  producedblocks: 57595,
  missedblocks: 374,
  rate: 5,
  approval: 1.25,
  productivity: 99.35,
  blocks: [ dummyBlock ],
  blocksAt: 38736904,
  forgingTime: 328,
  isRoundDelegate: true,
  status: '3:5'
},
{
  username: 'ravelou',
  address: 'AXvBF7JoNyM6ztMrgr45KrqQf7LA7RgZhf',
  publicKey:
  '021f277f1e7a48c88f9c02988f06ca63d6f1781471f78dba49d58bab85eb3964c6',
  vote: '165756621439250',
  producedblocks: 87563,
  missedblocks: 834,
  rate: 6,
  approval: 1.23,
  productivity: 99.06,
  blocks: [ dummyBlock ],
  blocksAt: 38737008,
  forgingTime: 0,
  isRoundDelegate: true,
  status: '3:6'
}
]

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