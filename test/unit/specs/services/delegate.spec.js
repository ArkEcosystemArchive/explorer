/* Disable eslint for the block and forging imports */
/* eslint-disable no-unused-vars */
import DelegateService from '@/services/delegate'
import store from '@/store'

const delegatePropertyArray = [
  'username',
  'address',
  'publicKey',
  'votes',
  'rank',
  'blocks',
  'production',
  'forged'
].sort()

const voterPropertyArray = [
  'address',
  'publicKey',
  'username',
  'secondPublicKey',
  'balance',
  'isDelegate'
].sort()

describe('Delegate Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io/api/v2')
    store.dispatch('network/setActiveDelegates', 51)
  })

  it('should return all available delegates', async () => {
    const data = await DelegateService.all()
    expect(Object.keys(data[0]).sort()).toEqual(delegatePropertyArray)
    expect(data.length).toBeGreaterThan(102)
  })

  it('should retrieve the voters based on given delegate public key, excluding low balances', async() => {
    const data = await DelegateService.voters('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(Object.keys(data[0]).sort()).toEqual(voterPropertyArray)
    expect(data[0].balance).toBeGreaterThan(0.1 * Math.pow(10, 8))
  })

  it('should retrieve the voters based on given delegate public key, including low balances', async() => {
    const data = await DelegateService.voters('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b', false)
    expect(Object.keys(data[0]).sort()).toEqual(voterPropertyArray)
    const excluding = await DelegateService.voters('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(data.length).toBeGreaterThanOrEqual(excluding.length)
  })

  it('should fail when retrieving voters of delegate with non-existing public key', async() => {
    await expect(DelegateService.voters('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should return the delegate when searching by username', async() => {
    const data = await DelegateService.find('arkpool')
    expect(Object.keys(data).sort()).toEqual(delegatePropertyArray)
    expect(data.username).toBe('arkpool')
  })

  it('should fail when searching for delegate by non-existing username', async() => {
    await expect(DelegateService.find('asdfasdfasdfasdfasdfasdf')).rejects.toThrow()
  })

  it('should return the delegate when searching by public key', async() => {
    const data = await DelegateService.find('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(Object.keys(data).sort()).toEqual(delegatePropertyArray.sort())
    expect(data.username).toBe('arkpool')
  })

  it('should fail when searching for non-existing public key', async() => {
    await expect(DelegateService.find('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should fail if the public key exists but does not correspond to a delegate', async() => {
    await expect(DelegateService.find('021d03bace0687a1a5e797f884b13fb46f817ec32de1374a7f223f24404401d220')).rejects.toThrow()
  })

  it('should retrieve the standby delegates', async() => {
    const data = await DelegateService.standby()
    expect(data.length).toBeGreaterThan(0)
    expect(Object.keys(data[0]).sort()).toEqual(delegatePropertyArray)
  })

  it('should return a list of active delegates and their stats', async() => {
    jest.setTimeout(20000) // Allow this function to take longer than the specified 5 seconds
    const delegates = await DelegateService.active()
    expect(Object.keys(delegates[0]).sort()).toEqual(delegatePropertyArray.concat(['forgingStatus']).sort())
  })

  it('should return a list of delegates and their forged amounts', async() => {
    const data = await DelegateService.forged()
    expect(Object.keys(data[0]).sort()).toEqual([
      'delegate',
      'forged'
    ])
  })

  it('should return the count of active delegates', async() => {
    const data = await DelegateService.activeDelegatesCount()
    expect(data).toBeGreaterThan(102)
  })
})
