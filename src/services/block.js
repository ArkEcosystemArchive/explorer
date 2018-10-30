import ApiService from '@/services/api'

class BlockService {
  async latest(limit = 25) {
    const response = await ApiService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit
      }
    })
    return response.data.blocks
  }

  async last() {
    const response = await ApiService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit: 1
      }
    })
    return response.data.blocks[0]
  }

  async find(id) {
    const response = await ApiService.get('blocks/get', {
      params: {
        id
      }
    })
    return response.data.block
  }

  async paginate(page, limit = 25) {
    const offset = page > 1 ? (page - 1) * limit : 0

    const response = await ApiService.get('blocks', {
      params: {
        orderBy: 'height:desc',
        limit,
        offset
      }
    })
    return response.data.blocks
  }

  async findPrevious(height) {
    const response = await ApiService.get('blocks', {
      params: { height: height - 1 }
    })
    return response.data.blocks[0]
  }

  async findNext(height) {
    const response = await ApiService.get('blocks', {
      params: { height: height + 1 }
    })
    return response.data.blocks[0]
  }
}

export default new BlockService()
