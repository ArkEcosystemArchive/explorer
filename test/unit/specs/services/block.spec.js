import blockService from '@/services/block'
import store from '@/store'

const blockPropertyArray = [
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
].sort()

describe('Block Service', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io:8443/api')
  })

  it('should return the latest blocks', async () => {
    const data = await blockService.latest()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return the last block', async () => {
    const data = await blockService.last()
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return the block height', async () => {
    const data = await blockService.height()
    expect(data).toBeGreaterThan(4771470)
  })

  it('should return the supply', async () => {
    const data = await blockService.supply()
    expect(data).toBeGreaterThan(13439174400000000)
  })

  it('should return the block for the given id', async () => {
    const data = await blockService.find('12382692495927527414')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should fail when given block id is incorrect', async () => {
    await expect(blockService.find('0')).rejects.toThrow()
  })

  it('should return the blocks by an offset', async () => {
    jest.setTimeout(30000)
    const data = await blockService.paginate()
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return the blocks for given generator public key', async () => {
    jest.setTimeout(30000)
    const data = await blockService.getByPublicKey('0257581c82d1931c4b0b2df9d658ecd303fcf2a6ea4ec291669ed06f44fb75c8fe')
    expect(data).toHaveLength(25)
    expect(Object.keys(data[0]).sort()).toEqual(blockPropertyArray)
    expect(data[0].height < data[1].height)
  })

  it('should return an empty list when given generator public key is incorrect', async () => {
    jest.setTimeout(30000)
    const data = await blockService.getByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toHaveLength(0)
  })

  it('should return the number of blocks forged by given generator public key', async () => {
    jest.setTimeout(30000)
    const data = await blockService.forgedByPublicKeyCount('0257581c82d1931c4b0b2df9d658ecd303fcf2a6ea4ec291669ed06f44fb75c8fe')
    expect(data).not.toBeDefined() // Currently this endpoint is not supported
  })

  it('should fail to return count when given generator public key is incorrect', async () => {
    jest.setTimeout(30000)
    const data = await blockService.forgedByPublicKeyCount('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toBeUndefined()
  })

  it('should return the last block for given generator public key', async () => {
    jest.setTimeout(30000) // This function easily takes 10-20 seconds to resolve, not sure why
    const data = await blockService.lastBlockByPublicKey('0257581c82d1931c4b0b2df9d658ecd303fcf2a6ea4ec291669ed06f44fb75c8fe')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return undefined when given generator public key is incorrect', async () => {
    jest.setTimeout(30000)
    const data = await blockService.lastBlockByPublicKey('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    expect(data).toBeUndefined()
  })

  it('should return the previous block for the given height', async () => {
    jest.setTimeout(30000) // This function easily takes 10-20 seconds to resolve, not sure why
    const data = await blockService.findPrevious(4771470)
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return undefined when finding previous block for an incorrect height', async () => {
    jest.setTimeout(30000)
    const data = await blockService.findPrevious(1234567891234567890)
    expect(data).toBeUndefined()
  })

  it('should fail when an no parameter is given (findPrevious)', async() => {
    await expect(blockService.findPrevious()).rejects.toThrow()
  })

  it('should return the latest block when an empty string is given (findPrevious)', async() => {
    const data = await blockService.findPrevious('')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return the next block for the given height', async () => {
    jest.setTimeout(30000) // This function easily takes 10-20 seconds to resolve, not sure why
    const data = await blockService.findNext(4771470)
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return undefined when finding next block for an incorrect height', async () => {
    const data = await blockService.findNext(1234567891234567890)
    expect(data).toBeUndefined()
  })

  it('should fail when no parameter is given (findNext)', async() => {
    await expect(blockService.findNext()).rejects.toThrow()
  })

  it('should return the block at height 1 when an empty string is given (findNext)', async() => {
    jest.setTimeout(30000)
    const data = await blockService.findNext('')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
    expect(data.height).toBe(1)
  })
})
