import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IMedia } from '../../../models/iMedia';
import { ROOT_HOST } from '../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news = [];

  constructor(private http: HttpClient) { }

  GetPosts(count: number = 5) {
    const url = `${ROOT_HOST}/api/news/${count}`;
    return this.http.get<IMedia[]>(url);
  }

}
