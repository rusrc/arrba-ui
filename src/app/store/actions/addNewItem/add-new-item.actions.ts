import { Action } from '@ngrx/store';
import { IMessage } from '../../../models/message';

export enum AddNewItemActionTypes {
  addNewItem = '[AddNewItem] AddNewItem'
}

export class AddNewItemAction implements Action {
  readonly type = AddNewItemActionTypes.addNewItem;
  constructor(public message: IMessage) { }
}

export type AddNewItemActions = AddNewItemAction;
