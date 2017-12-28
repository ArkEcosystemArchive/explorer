import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CONFIG } from '../../app.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class SocketHeaderService extends Socket {

  constructor() {
    super({ url: CONFIG.SOCKET, options: {} });
   }

}

@Injectable()
export class SocketGraphService extends Socket {

  constructor() {
    super({ url: CONFIG.GRAPH_SOCKET, options: {} });
  }

}

@Injectable()
export class SocketMonitorService extends Socket {

  constructor() {
    super({ url: CONFIG.MONITOR_SOCKET, options: {} });
  }

}
