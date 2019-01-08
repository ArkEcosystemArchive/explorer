import TransactionService from '@/services/transaction'
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
// Note: asset, recipientId, signSignature and vendorField can also be returned, but are optional

describe('Transaction Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io/api/v2')
  })

  it('should return the latest transactions ordered by timestamp descending', async () => {
    const data = await TransactionService.latest()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should find a transaction by its id', async () => {
    const data = await TransactionService.find('bd8a71caeeab36339ac5baf832bb0e150549629c1992dc749a79ff3cdcd449fc')
    expect(Object.keys(data).sort()).toEqual(expect.arrayContaining(transactionPropertyArray.concat(['asset']).sort()))
  })

  it('should fail if no transaction can be found for given id', async () => {
    await expect(TransactionService.find('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should return latest transactions with page offset', async() => {
    const data = await TransactionService.paginate(1)
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return latest transactions with page offset and given limit', async() => {
    const data = await TransactionService.paginate(2, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should filter the transactions and only return type 3 transactions', async() => {
    const data = await TransactionService.filterByType(1, 3)
    expect(data).toHaveLength(25)
    data.forEach(transaction => {
      expect(Object.keys(transaction).sort()).toEqual(expect.arrayContaining(transactionPropertyArray))
      expect(transaction.type === 3)
    })
  })
})
