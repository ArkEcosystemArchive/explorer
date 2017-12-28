import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { StatisticModel } from '../../models/statistic.model';

@Injectable()
export class GraphStatisticService {
    // watcher
    private statisticSource = new Subject<StatisticModel>();
    statisticChange$ = this.statisticSource.asObservable();

  // statistic methods
  public statistic = new StatisticModel();

    public changeStatistic(value: any) {
        this.statisticSource.next(value);
    }

    public refresh(sigma: any) {
        const txs = this._nodesByType(0, sigma);
        const blocks = this._nodesByType(1, sigma);
        const accounts = this._nodesByType(2, sigma);

        this.statistic.txs = txs.length;
        this.statistic.volume = this._txsVolume(txs);
        this.statistic.blocks = blocks.length;
        this.statistic.beginning = this._minTime(blocks);
        this.statistic.end = this._maxTime(blocks);
        this.statistic.accounts = accounts.length;

        this.changeStatistic(this.statistic);
    }

    private _nodesByType(type: any, sigma: any) {
        return sigma.graph.nodes().filter(function (node) {
            return node.type === type;
        });
    }

    private _txsVolume(chain: any) {
        return chain.reduce(function (vol, tx) {
            return vol + tx.amount;
        }, 0);
    }

    private _minTime(chain: any) {
        const timestampArray = [];
        chain.forEach(element => {
            timestampArray.push(element.timestamp);
        });
        return Math.min(...timestampArray);
    }

    private _maxTime(chain: any) {
        const timestampArray = [];
        chain.forEach(element => {
            timestampArray.push(element.timestamp);
        });
        return Math.max(...timestampArray);
    }

}
