import walletService from '@/services/wallet'
import store from '@/store'

describe('Wallet Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
  })

  it('should return address when searching for existing wallet', async () => {
    const data = await walletService.find('ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC')
    // Response should contain all these properties
    expect(Object.keys(data).sort()).toEqual([
      'address',
      'unconfirmedBalance',
      'balance',
      'publicKey',
      'unconfirmedSignature',
      'secondSignature',
      'secondPublicKey',
      'multisignatures',
      'u_multisignatures'
    ].sort())
  })

  it('should fail when searching for incorrect wallet address', async () => {
    await expect(walletService.find('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gsx')).rejects.toThrow()
  })

  it('should return delegate when address is voting for one', async () => {
    const data = await walletService.vote('ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC')
    expect(Object.keys(data).sort()).toEqual([
      'username',
      'address',
      'publicKey',
      'vote',
      'producedblocks',
      'missedblocks',
      'rate',
      'approval',
      'productivity'
    ].sort())
  })

  it('should return false when address is not voting', async () => {
    await expect(walletService.vote('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')).resolves.toEqual(false)
  })

  it('should fail when fetching vote for incorrect wallet address', async () => {
    await expect(walletService.vote('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gsx')).rejects.toThrow()
  })

  it('should return a list of top wallet accounts', async () => {
    const data = await walletService.top()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual([
      'address',
      'balance',
      'publicKey'
    ].sort())
  })

  it('should correctly paginate top wallet accounts', async () => {
    await expect(walletService.top(2)).resolves.toHaveLength(25)
    await expect(walletService.top(2, 20)).resolves.toHaveLength(20)
  })
})
