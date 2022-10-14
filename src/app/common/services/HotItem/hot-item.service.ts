import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HotItem } from '../../../models/hotItem';
import { ROOT_HOST } from '../../constants/constants';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotItemService {

  constructor(private http: HttpClient) { }

  /**
   * Retrun hot items
   * @param countryId - countryId
   * @param regionId - regionId
   * @param cityId - cityId
   */
  Get(countryId: number, regionId: number = 0, cityId: number = 0): Observable<HotItem[]> {
    const url = `${ROOT_HOST}/api/HotAds/${countryId}/${regionId}/${cityId}`;
    return this.http.get(url).pipe(map(resp => resp as HotItem[]));
  }
}
