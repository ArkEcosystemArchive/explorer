import ApiService from '@/services/api'

class BlockService {
  async latest(limit = 25) {
    const response = await ApiService.get('blocks', {
      params: {
        limit
      }
    })

    return response.data
  }

  async last() {
    const response = await ApiService.get('blocks', {
      params: {
        limit: 1
      }
    })

    return response.data[0]
  }

  async find(id) {
    const response = await ApiService.get(`blocks/${id}`)
    return response.data
  }

  async paginate(page, limit = 25) {
    const response = await ApiService.get('blocks', {
      params: {
        page,
        limit
      }
    })

    return response
  }

  async byAddress(address, page, limit = 25) {
    const response = await ApiService.get(`delegates/${address}/blocks`, {
      params: {
        page,
        limit
      }
    })

    return response
  }

  async findPrevious(height) {
    const response = await ApiService.get(`blocks/${height - 1}`)
    return response.data
  }

  async findNext(height) {
    const response = await ApiService.get(`blocks/${height + 1}`)
    return response.data
  }
}

export default new BlockService()
