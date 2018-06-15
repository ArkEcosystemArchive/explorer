import transactionService from '@/services/transaction'
import store from '@/store'

const blockPropertyArray = [
  'id',
  'blockid',
  'type',
  'timestamp',
  'amount',
  'fee',
  'senderId',
  'senderPublicKey',
  'signature',
  'confirmations'
].sort()
// Note: asset, recipientId, signSignature and vendorField can also be returned, but are optional

describe('Transaction Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
  })

  it('should return the latest transactions ordered by timestamp descending', async () => {
    const data = await transactionService.latest()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should find a transaction by its id', async () => {
    const data = await transactionService.find('bd8a71caeeab36339ac5baf832bb0e150549629c1992dc749a79ff3cdcd449fc')
    expect(Object.keys(data).sort()).toEqual(expect.arrayContaining(blockPropertyArray.concat(['height', 'votes']).sort()))
  })

  it('should fail if no transaction can be found for given id', async () => {
    await expect(transactionService.find('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).rejects.toThrow()
  })

  it('should return the transactions for a given block', async () => {
    const data = await transactionService.findByBlock('8034780571166969612')
    expect(data).toHaveLength(1)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
  })

  it('should return no transactions if offset is larger than the amount of transactions', async () => {
    const data = await transactionService.findByBlock('8034780571166969612', 2)
    expect(data).toHaveLength(0)
  })

  it('should return and empty list if no transactions in a block', async () => {
    const data = await transactionService.findByBlock('7818295669546141032')
    expect(data).toHaveLength(0)
  })

  it('should return an empty list of transactions when an incorrect block id is given', async () => {
    const data = await transactionService.findByBlock('0')
    expect(data).toHaveLength(0)
  })

  it('should return the latest registrations', async () => {
    const data = await transactionService.latestRegistrations()
    expect(data).toHaveLength(5)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray.concat(['asset']).sort())
    expect(data[0].type).toBe(2)
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return the latest votes', async () => {
    const data = await transactionService.latestVotes()
    expect(data).toHaveLength(5)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].type).toBe(3)
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all transactions for an address', async () => {
    const data = await transactionService.allByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all transactions for an address, with offset', async () => {
    const data = await transactionService.allByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs', 3, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should fail when searching for transactions if address does not exist', async () => {
    await expect(transactionService.allByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gz')).rejects.toThrow()
  })

  it('should return all outgoing transactions for an address', async () => {
    const data = await transactionService.sentByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all outgoing transactions for an address, with offset', async () => {
    const data = await transactionService.sentByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs', 3, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should fail when searching for outgoing transactions if address does not exist', async () => {
    await expect(transactionService.sentByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gz')).rejects.toThrow()
  })

  it('should return all incoming transactions for an address', async () => {
    const data = await transactionService.receivedByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return all incoming transactions for an address, with offset', async () => {
    const data = await transactionService.receivedByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK', 3, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should fail when searching for incoming transactions if address does not exist', async () => {
    await expect(transactionService.receivedByAddress('AYCTHSZionfGoQsRnv5gECEuFWcZXS38gz')).rejects.toThrow()
  })

  it('should return count of outgoing transactions for an address', async () => {
    const data = await transactionService.sentByAddressCount('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK')
    expect(Number(data)).toBeGreaterThan(0)
  })

  it('should return count of incoming transactions for an address', async () => {
    const data = await transactionService.receivedByAddressCount('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK')
    expect(Number(data)).toBeGreaterThan(0)
  })

  it('should return count of transactions in given block', async () => {
    const data = await transactionService.findByBlockCount('14744703911220072486')
    expect(Number(data)).toBe(1)
  })

  it('should return latest transactions with offset', async() => {
    const data = await transactionService.paginate(0)
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return latest transactions with offset and given limit', async() => {
    const data = await transactionService.paginate(2, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return latest transactions for an address with offset', async() => {
    const data = await transactionService.paginateByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK', 0)
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })

  it('should return latest transactions for an address with offset and given limit', async() => {
    const data = await transactionService.paginateByAddress('AUexKjGtgsSpVzPLs6jNMM6vJ6znEVTQWK', 2, 40)
    expect(data).toHaveLength(40)
    expect(Object.keys(data[0]).sort()).toEqual(expect.arrayContaining(blockPropertyArray))
    expect(data[0].timestamp < data[1].timestamp)
  })
})
