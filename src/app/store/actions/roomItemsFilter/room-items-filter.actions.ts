import { Action } from '@ngrx/store';
import { Vehicle } from '../../../models/vehicle';
import { ItemState } from '../../../common/enums/ItemState';

export enum RoomItemsFilterActionTypes {
  LoadRoomItems = '[RoomItemsFilter] Load AdVehicles',
  SetActiveCategoryForRoomVehicles = '[RoomItemsFilter] Set active category for room vehicles',
  SetActiveStatusForItemsInFilterRoom = '[RoomItemsFilter] Set activity status for items in room filter'
}

export class LoadRoomItemsFilters implements Action {
  readonly type = RoomItemsFilterActionTypes.LoadRoomItems;
  constructor(public adVehicles: Vehicle[]) { }
}
export class SetActiveCategory implements Action {
  readonly type = RoomItemsFilterActionTypes.SetActiveCategoryForRoomVehicles;
  constructor(public categoryId: number) { }
}
export class SetActiveStatus implements Action {
  readonly type = RoomItemsFilterActionTypes.SetActiveStatusForItemsInFilterRoom;
  constructor(public status: ItemState) { }
}

export type RoomItemsFilterActions =
  | LoadRoomItemsFilters
  | SetActiveCategory
  | SetActiveStatus;
