import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { WebsocketsService } from '../../shared/services/websockets.service';
import { ConnectionMessageService } from '../../shared/services/connection-message.service';
import { GraphService } from './activity-graph.service';
import { GraphStatisticService } from './activity-statistic.service';
import { CurrencyService } from '../../shared/services/currency.service';
import { StatisticModel } from '../../models/statistic.model';
import { SettingsModel } from '../../models/settings.model';
import { initCurrency } from '../../shared/const/currency';

import 'rxjs/add/operator/switchMap';
import * as Sigma from 'sigma';

@Component({
  selector: 'ark-activity-graph',
  templateUrl: './activity-graph.component.html',
  styleUrls: ['./activity-graph.component.less'],
  providers: [WebsocketsService, GraphService, GraphStatisticService]
})
export class ActivityGraphComponent implements OnInit, OnDestroy {
  public sigma: any;
  public loading = true;
  public statistic = new StatisticModel();
  public settings = new SettingsModel();
  public currencyName: string = initCurrency.name;
  public currencyValue: number = initCurrency.value;
  public showLoader = false;

  private subscription: Subscription;
  private curSubscription: Subscription;
  private socket: Subscription;

  public renderer = {
    container: 'sigma-canvas',
    type: 'canvas'
  };

  constructor(
    private _socketService: WebsocketsService,
    private _graph: GraphService,
    private _statistic: GraphStatisticService,
    private _currencyService: CurrencyService,
    private _connectionService: ConnectionMessageService
  ) {
    this.socket = _socketService.getGraphData().subscribe(
      (data: any) => {
        this._connectionService.changeConnection(data.success);
        if (this.sigma) {
          _graph.refresh(this.sigma, data.block);
          _statistic.refresh(this.sigma);
        }
        this.showLoader = false;
      }
    );

    this.subscription = _statistic.statisticChange$.subscribe(statistic => {
      this.statistic = statistic;
    });
    this.curSubscription = _currencyService.currencyChosen$.subscribe(currency => {
      this.currencyName = currency.name;
      this.currencyValue = currency.value;
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this._connectionService.changeConnection(true);
    this.showLoader = true;
    this.sigma = new Sigma({
      renderer: this.renderer,
      settings: this.settings
    });
  }

  resetCamera() {
    if (this.sigma) {
      this.sigma.camera.goTo({ x: 0, y: 0, angle: 0, ratio: 1 });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.curSubscription.unsubscribe();
    this.socket.unsubscribe();
  }

}
