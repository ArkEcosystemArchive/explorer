import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public static isLocalStorageSupported(): boolean {
    return typeof (Storage) !== 'undefined';
  }

  public getValue(key: string): any {
    if (!LocalStorageService.isLocalStorageSupported() || !key) {
      return null;
    }

    return JSON.parse(localStorage.getItem(key));
  }

  public setValue(key: string, value: any): void {
    if (!LocalStorageService.isLocalStorageSupported()) {
      return;
    }

    localStorage.setItem(key, JSON.stringify(value));
  }
}
