import { Injectable } from '@angular/core';
import { ROOT_HOST } from '../../../common/constants/constants';
import { Model } from '../../../models/model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  GetAll(categoryId: number, brandId: number): Observable<Model[]> {
    const url = `${ROOT_HOST}/api/model/category/${categoryId}/brand/${brandId}`;
    return this.http.get(url).pipe(map(r => r as Model[]));
  }
}
