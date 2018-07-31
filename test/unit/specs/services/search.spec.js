import searchService from '@/services/search'
import store from '@/store'

describe('Search Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
  })

  it('should return address when searching for existing wallet', async () => {
    const data = await searchService.findByAddress('ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC')
    expect(Object.keys(data.account).sort()).toEqual([
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

  it('should fail when searching for non-existing wallet', async () => {
    await expect(searchService.findByAddress('ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xz')).rejects.toThrow()
  })

  it('should return delegate address when searching for existing username', async () => {
    const data = await searchService.findByUsername('arkpool')
    expect(Object.keys(data.delegate).sort()).toEqual([
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

  it('should fail when searching for non-matching username', async () => {
    await expect(searchService.findByAddress('asdhfajksdhfakjsdfasdf')).rejects.toThrow()
  })

  it('should return delegate address when searching for existing public key', async () => {
    const data = await searchService.findByPublicKey('02b1d2ea7c265db66087789f571fceb8cc2b2d89e296ad966efb8ed51855f2ae0b')
    expect(Object.keys(data.delegate).sort()).toEqual([
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

  it('should fail when searching for non-matching public key', async () => {
    await expect(searchService.findByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should return block when searching for existing block id', async () => {
    const data = await searchService.findByBlockId('16259489398325158419')
    expect(Object.keys(data.block).sort()).toEqual([
      'id',
      'version',
      'timestamp',
      'height',
      'previousBlock',
      'numberOfTransactions',
      'totalAmount',
      'totalFee',
      'reward',
      'payloadLength',
      'payloadHash',
      'generatorPublicKey',
      'generatorId',
      'blockSignature',
      'confirmations',
      'totalForged'
    ].sort())
  })

  it('should fail when searching for non-existing block id', async () => {
    await expect(searchService.findByBlockId('0')).rejects.toThrow()
  })

  it('should return transaction when searching for existing transaction id', async () => {
    const data = await searchService.findByTransactionId('e0a78fa665eb69a5e607a4f3f39a6c9c76a24b647f1cd1d56dd75b29ccf7fa60')
    expect(Object.keys(data.transaction).sort()).toEqual([
      'id',
      'blockid',
      'height',
      'type',
      'timestamp',
      'amount',
      'fee',
      'senderId',
      'senderPublicKey',
      'recipientId',
      'signature',
      'asset',
      'confirmations'
    ].sort())
  })

  it('should fail when searching for non-existing transaction id', async () => {
    await expect(searchService.findByTransactionId('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })
})
