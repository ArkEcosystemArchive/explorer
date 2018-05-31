import NodeService from '@/services/node'

class BlockService {
  async latest(limit = 25) {
    const response = await NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit
      }
    })
    return response.data.blocks
  }

  async last() {
    const response = await NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit: 1
      }
    })
    return response.data.blocks[0]
  }

  async height() {
    const response = await NodeService.get('blocks/getHeight')
    return response.data.height
  }

  async supply() {
    const response = await NodeService.get('blocks/getSupply')
    return response.data.supply
  }

  async find(id) {
    const response = await NodeService.get('blocks/get', {
      params: {
        id
      }
    })
    return response.data.block
  }

  async paginate(page, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit,
        offset
      }
    })
    return response.data.blocks
  }

  async getByPublicKey(generatorPublicKey, page, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit,
        offset,
        generatorPublicKey
      }
    })
    return response.data.blocks
  }

  async forgedByPublicKeyCount(generatorPublicKey) {
    const response = await NodeService.get('blocks', {
      params: {
        generatorPublicKey,
        limit: 1
      }
    })

    // currently not supported by node
    return response.data.count
  }

  async lastBlockByPublicKey(publicKey) {
    const response = await NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit: 1,
        generatorPublicKey: publicKey
      }
    })
    return response.data.blocks[0]
  }

  async findPrevious(height) {
    const response = await NodeService.get('blocks', {
      params: { height: height - 1 }
    })
    return response.data.blocks[0]
  }

  async findNext(height) {
    const response = await NodeService.get('blocks', {
      params: { height: height + 1 }
    })
    return response.data.blocks[0]
  }
}

export default new BlockService()
