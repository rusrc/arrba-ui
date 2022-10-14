import { Action } from '@ngrx/store';
import { Vehicle } from '../../../models/vehicle';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionTypes {
  LOAD_CARD_ITEMS = '[CardItem] Load CardItems',
  LOAD_CARD_ITEMS_SUCCESS = '[CardItem] Load CardItems successfully',
  LOAD_CARD_ITEMS_FAILED = '[CardItem] Load CardItems failed'
}

export class LoadCardItemsAction implements Action {
  readonly type = ActionTypes.LOAD_CARD_ITEMS;
  constructor(public itemId: number) { }
}

export class LoadCardItemsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_CARD_ITEMS_SUCCESS;
  constructor(public vehicle: Vehicle) { }
}

export class LoadCardItemsFailedAction implements Action {
  readonly type = ActionTypes.LOAD_CARD_ITEMS_FAILED;
  constructor(public error: HttpErrorResponse) { }
}

export type Actions = LoadCardItemsAction
  | LoadCardItemsSuccessAction
  | LoadCardItemsFailedAction;
