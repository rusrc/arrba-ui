import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserPhone } from '../../../models/iUserPhone';
import { ROOT_HOST } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }

  get(adVehicleId: number) {
    const url = ROOT_HOST + `/api/profile/phone/${adVehicleId}`;
    return this.http.get<IUserPhone>(url);
  }

  getAll(adVehicleId: number) {
    const url = ROOT_HOST + `/api/profile/phone/${adVehicleId}/all`;
    return this.http.get<IUserPhone[]>(url);
  }

  delete(number: string) {
    const url = ROOT_HOST + `/api/profile/phone/${number}/delete`;
    return this.http.delete(url, { observe: 'response' });
  }
}
