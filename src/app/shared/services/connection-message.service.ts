import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ConnectionMessageService {
  private connectionSource = new Subject<boolean>();

  connectionChange$ = this.connectionSource.asObservable();

  changeConnection(value: boolean) {
    this.connectionSource.next(value);
  }
}
