import delegateService from '@/services/delegate'
import block from '@/services/block'
import forging from '@/services/forging'
import store from '@/store'

const delegatePropertyArray = [
  'username',
  'address',
  'publicKey',
  'vote',
  'producedblocks',
  'missedblocks',
  'rate',
  'approval',
  'productivity'
].sort()

const voterPropertyArray = [
  'username',
  'address',
  'publicKey',
  'balance'
  ].sort()

describe('Delegate Service', () => {

  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
    store.dispatch('network/setActiveDelegates', 51)
  })

  it('should return all available delegates', async () => {
    const data = await delegateService.all()
    expect(Object.keys(data[0]).sort()).toEqual(delegatePropertyArray)
    expect(data.length).toBeGreaterThan(102)
  })

  it('should retrieve the voters based on given delegate public key, excluding low balances', async() => {
    const data = await delegateService.voters('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(Object.keys(data[0]).sort()).toEqual(voterPropertyArray)
    expect(data[0].balance).toBeGreaterThan(0.1 * Math.pow(10, 8))
  })

  it('should retrieve the voters based on given delegate public key, including low balances', async() => {
    const data = await delegateService.voters('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b', false)
    expect(Object.keys(data[0]).sort()).toEqual(voterPropertyArray)
    const excluding = await delegateService.voters('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(data.length).toBeGreaterThanOrEqual(excluding.length)
  })

  it('should fail when retrieving voters of delegate with non-existing public key', async() => {
    await delegateService.voters('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').rejects
  })

  it('should return the delegate when searching by username', async() => {
    const data = await delegateService.findByUsername('arkpool')
    expect(Object.keys(data).sort()).toEqual(delegatePropertyArray)
    expect(data.username).toBe('arkpool')
  })

  it('should fail when searching for delegate by non-existing username', async() => {
    await delegateService.findByUsername('asdfasdfasdfasdfasdfasdf').rejects
  })

  it('should return the delegate when searching by public key', async() => {
    const data = await delegateService.find('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(Object.keys(data).sort()).toEqual(delegatePropertyArray.concat('forged').sort())
    expect(data.username).toBe('arkpool')
  })

  it('should fail when searching for non-existing public key', async() => {
    await delegateService.find('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').rejects
  })

  it('should retrieve the standby delegates', async() => {
    const data = await delegateService.standby()
    expect(Object.keys(data[0]).sort()).toEqual(delegatePropertyArray)
    expect(data.length).toBe(51)
  })

  it('should retrieve the list of next forgers', async() => {
    const data = await delegateService.nextForgers()
    expect(data.length).toBeLessThanOrEqual(51)
  })

  it('should return a list of active delegates and their stats', async() => {
    const data = await delegateService.activeDelegates()
    expect(data.delegateCount).toBeDefined()
    expect(data.delegates).toBeDefined()
    expect(Object.keys(data.delegates[0]).sort()).toEqual([
      'username',
      'address',
      'publicKey',
      'vote',
      'producedblocks',
      'missedblocks',
      'rate',
      'approval',
      'productivity',
      'blocks',
      'blocksAt',
      'forgingTime',
      'isRoundDelegate',
      'status',
      'forgingStatus'
    ].sort())
    
  })

  it('should return a list of delegates and their forged amounts', async() => {
    const data = await delegateService.forged()
    expect(Object.keys(data[0]).sort()).toEqual([
      'delegate',
      'forged'
    ])
  })

  it('should return the count of active delegates', async() => {
    const data = await delegateService.activeDelegatesCount()
    expect(data).toBeGreaterThan(102)
  })
  
})