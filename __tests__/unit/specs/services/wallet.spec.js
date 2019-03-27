import WalletService from '@/services/wallet'
import store from '@/store'

const walletPropertyArray = [
  'address',
  'balance',
  'isDelegate',
  'publicKey',
  'secondPublicKey',
  'username',
  'vote'
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
      'username',
      'vote'
    ].sort())
  })

  it('should fail when searching for incorrect wallet address', async () => {
    await expect(WalletService.find('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gsx')).rejects.toThrow()
  })

  it('should return a list of top wallet accounts', async () => {
    const { data } = await WalletService.top()
    expect(data).toHaveLength(25)
    data.forEach(wallet => {
      expect(Object.keys(wallet).sort()).toEqual(walletPropertyArray.sort())
    })
  })

  it('should return top wallets with page offset', async () => {
    const { data } = await WalletService.top(1)
    expect(data).toHaveLength(25)
    data.forEach(wallet => {
      expect(Object.keys(wallet).sort()).toEqual(walletPropertyArray.sort())
    })
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data)
  })

  it('should return top wallets with page offset and given limit', async () => {
    const { data } = await WalletService.top(2, 20)
    expect(data).toHaveLength(20)
    data.forEach(wallet => {
      expect(Object.keys(wallet).sort()).toEqual(walletPropertyArray.sort())
    })
    expect(data.sort((a, b) => a.balance > b.balance)).toEqual(data)
  })
})
