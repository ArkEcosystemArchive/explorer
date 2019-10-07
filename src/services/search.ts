import { BlockService, DelegateService, WalletService, TransactionService } from "@/services";
import { IBlock, ITransaction, IDelegate, IWallet } from "../interfaces";

class SearchService {
  public async walletByAddress(address: string): Promise<IWallet> {
    return WalletService.find(address);
  }

  public async delegateByQuery(query: string): Promise<IDelegate> {
    return DelegateService.find(query);
  }

  public async blockByQuery(id: string): Promise<IBlock> {
    return BlockService.find(id);
  }

  public async transactionById(id: string): Promise<ITransaction> {
    return TransactionService.find(id);
  }
}

export default new SearchService();
