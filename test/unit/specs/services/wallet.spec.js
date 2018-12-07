import WalletService from '@/services/wallet'
import store from '@/store'

const transactionPropertyArray = [
  'id',
  'blockId',
  'type',
  'timestamp',
  'amount',
  'fee',
  'sender',
  'recipient',
  'signature',
  'confirmations'
].sort()

describe('Wallet Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io/api/v2')
  })

  it('should return address when searching for existing wallet', async () => {
    const data = await WalletService.find('ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC')
    // Response should contain all these properties
    expect(Object.keys(data).sort()).toEqual([
      'address',
      'balance',
      'isDelegate',
      'publicKey',
      'secondPublicKey',
      'username'
    ].sort())
  })

  it('should fail when searching for incorrect wallet address', async () => {
    await expect(WalletService.find('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gsx')).rejects.toThrow()
  })

  it('should return delegate when address is voting for one', async () => {
    const data = await WalletService.vote('ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC')
    expect(Object.keys(data).sort()).toEqual([
      'username',
      'address',
      'publicKey',
      'votes',
      'rank',
      'blocks',
      'production',
      'forged'
    ].sort())
  })

  it('should return false when address is not voting', async () => {
    await expect(WalletService.vote('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')).resolves.toEqual(false)
  })

  it('should fail when fetching vote for incorrect wallet address', async () => {
    await expect(WalletService.vote('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gsx')).rejects.toThrow()
  })

  it('should return latest transactions for an address and page offset', async() => {
    const data = await WalletService.paginateByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK', 1)
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return latest transactions for an address with page offset and given limit', async() => {
    const data = await WalletService.paginateByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK', 2, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all outgoing transactions for an address', async () => {
    const data = await WalletService.sentByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all outgoing transactions for an address with page offset', async () => {
    const data = await WalletService.sentByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs', 3, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return an empty list when searching for outgoing transactions if address does not exist', async () => {
    const data = await WalletService.sentByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gz')
    expect(data).toEqual([])
  })

  it('should return all incoming transactions for an address', async () => {
    const data = await WalletService.receivedByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all incoming transactions for an address with page offset', async () => {
    const data = await WalletService.receivedByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK', 3, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return an empty list when searching for outgoing transactions if address does not exist', async () => {
    const data = await WalletService.receivedByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gz')
    expect(data).toEqual([])
  })

  it('should return count of outgoing transactions for an address', async () => {
    const data = await WalletService.sentByAddressCount('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK')
    expect(Number(data)).toBeGreaterThan(0)
  })

  it('should return count of incoming transactions for an address', async () => {
    const data = await WalletService.receivedByAddressCount('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK')
    expect(Number(data)).toBeGreaterThan(0)
  })

  it('should return a list of top wallet accounts', async () => {
    const data = await WalletService.top()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual([
      'address',
      'balance',
      'isDelegate',
      'publicKey',
      'secondPublicKey',
      'username'
    ].sort())
  })

  it('should correctly paginate top wallet accounts', async () => {
    await expect(WalletService.top(2)).resolves.toHaveLength(25)
    await expect(WalletService.top(2, 20)).resolves.toHaveLength(20)
  })
})
