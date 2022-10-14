import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';
import { IProfile } from '../../../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  get() {
    const url = ROOT_HOST + '/api/profile/user';
    return this.http.get<IProfile>(url);
  }
}
