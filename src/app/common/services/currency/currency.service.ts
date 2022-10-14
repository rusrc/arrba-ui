import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';
import { Currency } from '../../../models/currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  GetAll() {
    const url = `${ROOT_HOST}/api/currency/all`;
    return this.http.get<Currency[]>(url);
  }

  getAllHardCoded() {
    return [
      { ID: 4, Name: 'Руб' },
      { ID: 1, Name: 'USD' },
      { ID: 2, Name: 'Тенге' },
      { ID: 3, Name: 'EUR' }];
  }
}
