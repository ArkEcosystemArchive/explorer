import ApiService from '@/services/api'

class TransactionService {
  async latest(limit = 25) {
    const response = await ApiService.get('transactions', {
      params: {
        orderBy: 'timestamp:desc',
        limit
      }
    })
    return response.data
  }

  async find(id) {
    const response = await ApiService.get(`transactions/${id}`)
    return response.data
  }

  async paginate(page, limit = 25) {
    const response = await ApiService.get('transactions', {
      params: {
        page,
        limit
      }
    })
    return response.data
  }
}

export default new TransactionService()
