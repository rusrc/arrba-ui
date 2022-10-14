import { Property } from '../../../models/property';
import { Injectable } from '@angular/core';
import { ROOT_HOST } from '../../../common/constants/constants';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  GetAll(categoryId: number, addCheckBoxes?: boolean) {
    let url = `${ROOT_HOST}/api/property/category/${categoryId}`;
    if (addCheckBoxes) {
      url = url + '/add-checkboxes';
    }
    return this.http.get(url).pipe(map(r => r as Property[]));
  }

}
