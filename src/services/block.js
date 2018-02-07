import NodeService from '@/services/node'

class BlockService {
  latest(limit = 25) {
    return NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit
      }
    }).then(response => response.data.blocks)
  }

  last() {
    return NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit: 1
      }
    }).then(response => response.data.blocks[0])
  }

  height() {
    return NodeService
      .get('blocks/getHeight')
      .then(response => response.data.height)
  }

  supply() {
    return NodeService
      .get('blocks/getSupply')
      .then(response => response.data.supply)
  }

  find(id) {
    return NodeService.get('blocks/get', {
      params: {
        id
      }
    }).then(response => response.data.block)
  }

  paginate(page, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    return NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit,
        offset
      }
    }).then(response => response.data.blocks)
  }

  getByPublicKey(generatorPublicKey, page, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    return NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit,
        offset,
        generatorPublicKey
      }
    }).then(response => response.data.blocks)
  }

  lastBlockByPublicKey(publicKey) {
    return NodeService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit: 1,
        generatorPublicKey: publicKey
      }
    }).then(response => response.data.blocks[0])
  }

  findPrevious(height) {
    return NodeService.get('blocks', {
      params: { height: height - 1 }
    }).then(response => response.data.blocks[0])
  }

  findNext(height) {
    return NodeService.get('blocks', {
      params: { height: height + 1 }
    }).then(response => response.data.blocks[0])
  }
}

export default new BlockService()
