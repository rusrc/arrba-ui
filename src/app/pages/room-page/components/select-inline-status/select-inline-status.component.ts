import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SetActiveStatus } from '../../../../store/actions/roomItemsFilter/room-items-filter.actions';
import { State } from '../../../../store/reducers';
import { ItemState } from '../../../../common/enums/ItemState';

@Component({
  selector: 'app-select-inline-status',
  templateUrl: './select-inline-status.component.html',
  styles: []
})
export class SelectInlineStatusComponent implements OnInit {

  @Input() queryParams: any;
  @Input() items: { Key: string, Value: number, isActive: boolean }[];
  activeItem: string;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.activeItem = ItemState.all;
  }

  onClick(event, item: { Key: ItemState, Value: number, isActive: boolean }) {
    event.preventDefault();
    const state = item.Key;
    this.activeItem = state;
    this.store.dispatch(new SetActiveStatus(state));
  }

  getQueryParams(sorter) {
    return { ...this.queryParams, ...{ 'sorter': sorter } };
  }

  getTitle(state: ItemState) {
    if (state === ItemState.all) {
      return 'Все';
    }
    if (state === ItemState.active) {
      return 'На сайте';
    }
    if (state === ItemState.inArchive) {
      return 'В архиве';
    }
    if (state === ItemState.onModiration) {
      return 'На проверке';
    }
    return '';
  }

}
