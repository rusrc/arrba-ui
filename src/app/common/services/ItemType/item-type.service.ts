import { Injectable } from '@angular/core';
import { ROOT_HOST } from '../../../common/constants/constants';
import { map } from 'rxjs/operators';
import { ItemType } from '../../../models/itemType';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  constructor(private http: HttpClient) { }

  get(typeId: string, categoryId: number) {
    const url = `${ROOT_HOST}/api/ItemType/categoryId/${categoryId}/typeId/${typeId}`;
    return this.http.get<ItemType>(url);
  }

  GetAll(categoryId?: number) {
    let url;
    if (categoryId) {
      url = `${ROOT_HOST}/api/itemType/ByCategoryId/${categoryId}`;
    } else {
      url = `${ROOT_HOST}/api/itemType/all`;
    }

    return this.http.get<ItemType[]>(url);
  }

  GetByName(name: string) {
    const url = `${ROOT_HOST}/api/itemType/all/${name}/name`;
    return this.http.get<ItemType>(url);
  }
}
