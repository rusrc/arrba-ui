import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';
import { City } from '../../../models/city';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private _city$: BehaviorSubject<City>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient) {

    if (this.cityInLocalStorage) {
      this._city$ = new BehaviorSubject<City>(this.cityInLocalStorage);
    } else {
      this._city$ = new BehaviorSubject<City>(undefined);
    }
  }

  get(cityAlias: string) {
    const url = `${ROOT_HOST}/api/city/${cityAlias}`;
    return this.http.get<City>(url);
  }

  getOrderedByWeight(top: number = 24, isActiveOnly: boolean = false) {

    let params: HttpParams = new HttpParams();

    if (isActiveOnly) {
      params = params.append('isActive', 'true');
    }

    const url = `${ROOT_HOST}/api/city/${top}/allByWeight`;
    return this.http.get<City[]>(url, { params: params });
  }

  getAll(countryId: number, isActiveOnly: boolean = false) {

    let params: HttpParams = new HttpParams();

    if (isActiveOnly) {
      params = params.append('isActive', 'true');
    }

    const url = `${ROOT_HOST}/api/city/${countryId}/all`;
    return this.http.get<City[]>(url, { params: params });
  }

  get city$(): Observable<City> {
    return this._city$.asObservable();
  }

  get cityInLocalStorage(): City {
    try {
      if (isPlatformBrowser(this.platformId)) {

        const cityJson = localStorage.getItem('city');
        if (cityJson) {
          const parsedCity: City = JSON.parse(cityJson);
          if (parsedCity) {
            return parsedCity;
          }
        }

        return undefined; // No city selected
      }
    } catch (error) {
      console.error(error);
    }
  }

  set cityInLocalStorage(value: City) {
    try {
      if (isPlatformBrowser(this.platformId)) {

        if (value) {
          const cityJson = JSON.stringify(value);
          localStorage.setItem('city', cityJson);
        } else {
          localStorage.removeItem('city');
        }
        this._city$.next(value);
      }

    } catch (error) {
      console.error(error);
    }
  }

}
