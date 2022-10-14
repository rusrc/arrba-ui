import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vehicle } from '../../../models/vehicle';
import { ROOT_HOST } from '../../constants/constants';
import { PagedList } from '../../components/pagination/models/pagedList';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private http: HttpClient
  ) { }

  get(
    superCategoryId: number,
    categoryId: number,
    brandName: string,
    modelName: string = null,
    cityAlias: string = null,
    pageNumber: number = 1,
    params?: Array<{ key: string, value: string }>) {

    let url = '';
    params = params || [];

    url += `${ROOT_HOST}/api/vehicle`;
    url += cityAlias ? `/city/${cityAlias}` : '';
    url += brandName ? `/brand/${encodeURIComponent(brandName)}` : '';
    url += modelName ? `/model/${encodeURIComponent(modelName)}` : '';
    url += `/all?pageNumber=${pageNumber}`;

    params.push({ key: 'superCategId', value: superCategoryId.toString() });
    params.push({ key: 'categId', value: categoryId.toString() });

    return this.http.post(url, params).pipe(map(resp => resp as PagedList<Vehicle>));
  }

  getVehicle(id: number): Observable<Vehicle> {
    const url = ROOT_HOST + `/api/vehicle/${id}`;
    return this.http.get<Vehicle>(url);
  }

  add(params: [{ key: string, value: string }]) {
    const url = ROOT_HOST + `/api/vehicle/add`;
    return this.http.post(url, params, { observe: 'response' });
  }

  edit(vehicle: Vehicle) {
    const url = `${ROOT_HOST}/api/room/item/edit`;
    return this.http.post<Vehicle>(url, vehicle, { observe: 'body' });
  }

  getByDelearshipId(dealershipId: number, currencyId: number = null, sorter: number = null, pageNumber: number = null) {
    const url = `${ROOT_HOST}/api/vehicle/dealershipId/${dealershipId}`;
    let params = new HttpParams();

    if (currencyId) {
      params = params.append('currencyId', currencyId.toString());
    }
    if (sorter) {
      params = params.append('sorter', sorter.toString());
    }
    if (pageNumber) {
      params = params.append('pageNumber', pageNumber.toString());
    }

    return this.http.get<PagedList<Vehicle>>(url, {
      params: params
    });
  }

  getConditions() {
    return [
      { ID: 1, Name: 'Новый' },
      { ID: 2, Name: 'Б/У' },
      { ID: 3, Name: 'Аварийный' }
    ];
  }

  /**
   * Generate name like BMW-x6-111
   * @param vehicle 
   */
  generateItemName(vehicle: Vehicle) {
    let itemNameFromDb = '';

    itemNameFromDb += vehicle.BrandName ? this.addDashes(vehicle.BrandName) : '';
    itemNameFromDb += vehicle.ModelName ? '-' + this.addDashes(vehicle.ModelName) : '';
    itemNameFromDb += vehicle.Year ? '-' + vehicle.Year : '';
    itemNameFromDb += '-' + vehicle.ID;

    return itemNameFromDb;
  }

  private addDashes(value: string) {
    return value.replace(/[\s]+/ig, '-');
  }
}
