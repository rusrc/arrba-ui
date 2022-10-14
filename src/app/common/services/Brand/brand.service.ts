import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Brand } from '../../../models/brand';
import { ROOT_HOST } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  GetAll(categoryId: number) {
    const url = `${ROOT_HOST}/api/brand/category/${categoryId}`;
    return this.http.get(url).pipe(map(r => r as Brand[]));
  }
}
