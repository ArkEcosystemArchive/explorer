import { BlockService, DelegateService, WalletService, TransactionService } from '@/services'

class SearchService {
  async walletByAddress(address) {
    return WalletService.find(address)
  }

  async delegateByQuery(query) {
    return DelegateService.find(query)
  }

  async blockByQuery(id) {
    return BlockService.find(id)
  }

  async transactionById(id) {
    return TransactionService.find(id)
  }
}

export default new SearchService()
