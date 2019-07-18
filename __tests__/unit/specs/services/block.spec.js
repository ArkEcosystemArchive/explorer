import BlockService from '@/services/block'
import store from '@/store'

const blockPropertyArray = [
  'id',
  'version',
  'height',
  'previous',
  'forged',
  'payload',
  'generator',
  'signature',
  'confirmations',
  'transactions',
  'timestamp'
].sort()

describe('Services > Block', () => {
  beforeAll(() => {
    store.dispatch('network/setServer', 'https://explorer.ark.io/api/v2')
  })

  it('should return the latest blocks', async () => {
    const data = await BlockService.latest()
    expect(data).toHaveLength(25)
    data.forEach(block => {
      expect(Object.keys(block).sort()).toEqual(blockPropertyArray)
    })
    expect(data.sort((a, b) => a.height > b.height)).toEqual(data)
  })

  it('should return the last block', async () => {
    const data = await BlockService.last()
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should return the block for the given id', async () => {
    jest.setTimeout(30000)
    const data = await BlockService.find('12382692495927527414')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should fail when given block id is incorrect', async () => {
    await expect(BlockService.find('0')).rejects.toThrow()
  })

  it('should return the blocks by an offset', async () => {
    jest.setTimeout(30000)
    const { data } = await BlockService.paginate()
    expect(data).toHaveLength(25)
    data.forEach(block => {
      expect(Object.keys(block).sort()).toEqual(blockPropertyArray)
    })
    expect(data.sort((a, b) => a.height > b.height)).toEqual(data)
  })

  it('should return the blocks for given generator address', async () => {
    jest.setTimeout(30000)
    const { data } = await BlockService.byAddress('AeaqhUKfBtVqNhtMct3piBiWfdhbRwbg4W')
    expect(data).toHaveLength(25)
    data.forEach(block => {
      expect(Object.keys(block).sort()).toEqual(blockPropertyArray)
    })
    expect(data.sort((a, b) => a.height > b.height)).toEqual(data)
  })

  xit('should return an empty list when given generator address is incorrect', async () => {
    jest.setTimeout(30000)
    const { data } = await BlockService.byAddress('XeaqhUKfBtVqNhtMct3piBiWfdhbRwbg4W')
    expect(data).toHaveLength(0)
  })

  it('should return the previous block for the given height', async () => {
    jest.setTimeout(30000) // This function easily takes 10-20 seconds to resolve, not sure why
    const data = await BlockService.findPrevious(4771470)
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should fail when finding previous block for an incorrect height', async () => {
    jest.setTimeout(30000)
    await expect(BlockService.findPrevious(1234567891234567890)).rejects.toThrow()
  })

  it('should fail when an no parameter is given (findPrevious)', async () => {
    await expect(BlockService.findPrevious()).rejects.toThrow()
  })

  it('should fail when an empty string is given (findPrevious)', async () => {
    await expect(BlockService.findPrevious('')).rejects.toThrow()
  })

  it('should return the next block for the given height', async () => {
    jest.setTimeout(30000) // This function easily takes 10-20 seconds to resolve, not sure why
    const data = await BlockService.findNext(4771470)
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
  })

  it('should fail when finding next block for an incorrect height', async () => {
    await expect(BlockService.findNext(1234567891234567890)).rejects.toThrow()
  })

  it('should fail when no parameter is given (findNext)', async () => {
    await expect(BlockService.findNext()).rejects.toThrow()
  })

  it('should return the block at height 1 when an empty string is given (findNext)', async () => {
    jest.setTimeout(30000)
    const data = await BlockService.findNext('')
    expect(Object.keys(data).sort()).toEqual(blockPropertyArray)
    expect(data.height).toBe(1)
  })
})
