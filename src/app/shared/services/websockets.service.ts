import { Injectable } from '@angular/core';
import { SocketHeaderService, SocketGraphService, SocketMonitorService } from './socket.service';

@Injectable()
export class WebsocketsService {

  constructor(
    private _headerSocket: SocketHeaderService,
    private _graphSocket: SocketGraphService,
    private _monitorSocket: SocketMonitorService
  ) { }

  public getHeaderData() {
    return this._headerSocket
        .fromEvent('data')
        .map(data => data);
  }

  public getGraphData() {
    return this._graphSocket
        .fromEvent('data')
        .map(data => data);
  }

  public getMonitorData() {
    return this._monitorSocket
        .fromEvent('data')
        .map(data => data);
  }

}
