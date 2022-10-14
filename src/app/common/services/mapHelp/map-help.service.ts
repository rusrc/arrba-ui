import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapHelpService {
  getKeyValueParams(queryParams: Object, checkEmtryValue = false): [{ key: string, value: string }] {
    let keyValueParams: any = Object
      .entries(queryParams);

    if (checkEmtryValue) {
      keyValueParams = keyValueParams.filter(arr => arr[1])
        .map(arr => ({ 'key': arr[0], 'value': arr[1] }));
    }

    if (checkEmtryValue === false) {
      keyValueParams = keyValueParams
        .map(arr => ({ 'key': arr[0], 'value': arr[1] }));
    }

    return keyValueParams as [{ key: string, value: string }];
  }
}
