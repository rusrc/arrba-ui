import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoomService } from '../../../../common/services/room/room.service';
import { Vehicle } from '../../../../models/vehicle';
import { Store } from '@ngrx/store';
import {
  State,
  getAdVehiclesForRoomFilter
} from '../../../../store/reducers';
import { LoadRoomItemsFilters } from '../../../../store/actions/roomItemsFilter/room-items-filter.actions';
import { PagedList } from '../../../../common/components/pagination/models/pagedList';
import { ActivatedRoute } from '@angular/router';
import { RoomSorter } from '../../../../common/enums/RoomSorter';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-room-home',
  templateUrl: './room-home.component.html'
})
export class RoomHomeComponent implements OnInit {

  breadcrumbRoutes: Array<{ key: string, value: string }>;
  mainFilterItems: Observable<{ Key: string, Value: any }[]>;
  categoryFilterItems: Observable<{ Key: string, Value: any }[]>;
  adVehicles$: Observable<Vehicle[]>;
  paged: any;
  queryParams: any;
  cardDisplayMode = 'simple'; // inDetail, simple

  constructor(
    private roomService: RoomService,
    private store: Store<State>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.breadcrumbRoutes = [
      { key: 'главная', value: '/' },
      { key: 'личный кабинет', value: '/' },
      { key: 'мои объявления', value: '/' }
    ];

    this.activatedRoute.queryParams.pipe(
      switchMap(queryParams => {
        const sorter = queryParams['sorter'] || RoomSorter.All;
        const categoryId = queryParams['categoryId'];
        const page = queryParams['pageNumber'] || 1;
        this.queryParams = queryParams;

        return of({ categoryId, sorter, page });
      }),
      switchMap(data => {
        const { categoryId, sorter, page } = data;

        return this.roomService.getItems(categoryId, sorter, page);
      })).subscribe((pagedAdVehicles: PagedList<Vehicle>) => {
        this.paged = pagedAdVehicles;
        this.store.dispatch(new LoadRoomItemsFilters(pagedAdVehicles.Items));
      });

    this.categoryFilterItems = this.activatedRoute.queryParams.pipe(
      switchMap(queryParams => {
        const sorter = queryParams['sorter'] || RoomSorter.All;
        return this.roomService.getCountOfCategories(sorter);
      }));

    // TODO remove this.store.select(getItemsCountByStatusForRoomFilter);
    // TODO remove this.store.select(getItemsCountByCategoryForRoomFilter);
    this.mainFilterItems = this.roomService.getFilterCountOfAds();
    this.adVehicles$ = this.store.select<any>(getAdVehiclesForRoomFilter);
  }

  onChange(event, mode) {
    event = event;
    this.cardDisplayMode = mode;
  }
}
