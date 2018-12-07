import WalletService from '@/services/wallet'
import DelegateService from '@/services/delegate'
import BlockService from '@/services/block'
import TransactionService from '@/services/transaction'

class SearchService {
  async walletByAddress(address) {
    return await WalletService.find(address)
  }

  async delegateByQuery(query) {
    return await DelegateService.find(query)
  }

  async blockByQuery(id) {
    return await BlockService.find(id)
  }

  async transactionById(id) {
    return await TransactionService.find(id)
  }
}

export default new SearchService()
