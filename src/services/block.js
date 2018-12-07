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

  async transactionsByBlock(id, page = 1, limit = 25) {
    const response = await ApiService.get(`blocks/${id}/transactions`, {
      params: {
        page,
        limit
      }
    })
    return response.data
  }

  async transactionsByBlockCount(id) {
    const response = await ApiService.get(`blocks/${id}`)
    return response.data.transactions
  }

  async paginate(page, limit = 25) {
    const response = await ApiService.get('blocks', {
      params: {
        limit,
        page
      }
    })

    return response.data
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
