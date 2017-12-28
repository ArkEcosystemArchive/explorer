import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('getValue should return null if key is not defined', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.getValue(null)).toBeNull();
  }));

  it('getValue should return null if no value for key was found', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.getValue('idonotexist')).toBeNull();
  }));

  it('setValue should not throw an exception if key is null', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setValue(null, null);
  }));

  it('setValue should work if value is null', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setValue('myKey', null);

    expect(service.getValue('myKey')).toBeNull();
  }));

  it('setValue & getValue result in same object', inject([LocalStorageService], (service: LocalStorageService) => {
    const myObject: any = {
      boolValue: true,
      stringValue: 'stringValue',
      numberValue: 1
    };

    service.setValue('myKey', myObject);

    const myResultObject: any = service.getValue('myKey');

    expect(myResultObject.boolValue).toEqual(myObject.boolValue);
    expect(myResultObject.stringValue).toEqual(myObject.stringValue);
    expect(myResultObject.numberValue).toEqual(myObject.numberValue);
  }));
});
