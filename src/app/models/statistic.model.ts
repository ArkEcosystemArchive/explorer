export class StatisticModel {
    accounts: number;
    blocks: number;
    txs: number;
    volume: number;
    beginning: number;
    end: number;

    constructor() {
        this.accounts = 0;
        this.blocks = 0;
        this.txs = 0;
        this.volume = 0;
        this.beginning = 0;
        this.end = 0;
    }

}
