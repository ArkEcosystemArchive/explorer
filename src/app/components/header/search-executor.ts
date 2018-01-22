import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

export class SearchExecutor<T> {
  private subscription: Subscription;

  public constructor(private query: Observable<T>,
                     private isSuccessFunc: (res: T) => boolean,
                     private routeFunc: (res: T) => any[]) {
  }

  public execute(onSuccess: (route: any[]) => void,
                 onError: (error: Error) => void,
                 onDone: () => void): void {
    this.subscription = this.query.subscribe(res => {
      if (this.isSuccessFunc(res)) {
        onSuccess(this.routeFunc(res));
      }
      onDone();
    }, (error) => {
      onError(error);
      onDone();
    });
  }

  public unsubscribe(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
