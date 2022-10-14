import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';
import { Vehicle } from '../../../models/vehicle';
import { RoomSorter } from '../../enums/RoomSorter';
import { PagedList } from '../../components/pagination/models/pagedList';



@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getItems(categoryId: number = 0, sorter: RoomSorter = RoomSorter.All, pageNumber: number = 1) {
    const url = `${ROOT_HOST}/api/room/all/items?categoryId=${categoryId}&sorter=${sorter}&page=${pageNumber}`;
    return this.http.get<PagedList<Vehicle>>(url);
  }

  getFilterCountOfAds() {
    const url = `${ROOT_HOST}/api/room/all/countOfItems`;
    return this.http.get<{ 'Key': string, 'Value': number }[]>(url);
  }

  getCountOfCategories(sorter: RoomSorter = RoomSorter.All) {
    const url = `${ROOT_HOST}/api/room/all/countOfCategories?sorter=${sorter}`;
    return this.http.get<{ 'Key': string, 'Value': number }[]>(url);
  }
}
