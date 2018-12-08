import WalletService from '@/services/wallet'
import DelegateService from '@/services/delegate'
import BlockService from '@/services/block'
import TransactionService from '@/services/transaction'

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
