import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';
import { Category } from '../../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  get(alias: string) {
    const url = ROOT_HOST + '/api/category/' + alias;
    return this.http.get<Category>(url);
  }

  getById(categoryId: number) {
    const url = ROOT_HOST + `/api/category/id/${categoryId}`;
    return this.http.get<Category>(url);
  }

  getAll() {
    const url = ROOT_HOST + '/api/category/all';
    return this.http.get<Category[]>(url);
  }
}
