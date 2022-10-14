import { Injectable } from '@angular/core';
import { ROOT_HOST } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Dealership } from '../../../models/dealership';


@Injectable({
  providedIn: 'root'
})
export class DealershipService {

  constructor(private http: HttpClient) { }

  get(id: number) {
    return this.http.get<Dealership>(`${ROOT_HOST}/api/dealership/${id}/id`);
  }

  getAll() {
    return this.http.get<Dealership[]>(`${ROOT_HOST}/api/Dealership/all`);
  }
}
