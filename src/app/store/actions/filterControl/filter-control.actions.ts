import { Action } from '@ngrx/store';
import { IFilterControls } from '../../../models/iFilterControls';
import { Model } from '../../../models/model';
import { Property } from '../../../models/property';
import { IItemExtended } from '../../../models/iItemExtended';

export enum ActionTypes {
  LoadFilterControls = '[FilterControl] Load FilterControls',
  AddFilterControls = '[FilterControl] Add FilterControls',
  SetItemToActiveStatus = '[FilterControl] Set item to active status',
  SetItemToInactiveStatus = '[FilterControl] Set item to inactive status',
  SetControlValue = '[FilterControl] Set control value on filter component',
  SetPropertyValue = '[FilterControl] Set property value on filter component',
  ActiveCategory = '[FilterControl] activate category in filter controls state',
  AddModelsInFilterControls = '[FilterControl] Add models into filter controls',
  ExpandFilter = '[FilterControl] expand filter, open the filter'
}

export class LoadFilterControlsAction implements Action {
  readonly type = ActionTypes.LoadFilterControls;
  constructor(public categoryId: number) { }
}
export class AddFilterControlsAction implements Action {
  readonly type = ActionTypes.AddFilterControls;
  constructor(public filterControls: IFilterControls) { }
}
export class ActivateItemOfFilterControlsAction implements Action {
  readonly type = ActionTypes.SetItemToActiveStatus;
  constructor(public item: IItemExtended) { }
}
export class InactivateItemOfFilterControlsAction implements Action {
  readonly type = ActionTypes.SetItemToInactiveStatus;
  constructor(public item: IItemExtended) { }
}
export class ActiveCategoryOfFilterControlsAction implements Action {
  readonly type = ActionTypes.ActiveCategory;
  constructor(public categoryId: number) { }
}
export class AddModelsInFilterControlsAction implements Action {
  readonly type = ActionTypes.AddModelsInFilterControls;
  constructor(public models: Model[]) { }
}
export class SetControlValueAction implements Action {
  readonly type = ActionTypes.SetControlValue;
  constructor(public control: { value: any, property: Property }) { }
}
export class SetPropertyValueAction implements Action {
  readonly type = ActionTypes.SetPropertyValue;
  constructor(public property: Property) { }
}
export class ExpandFilterAction implements Action {
  readonly type = ActionTypes.ExpandFilter;
  constructor(public filterExpanded: string) { }
}

export type Actions =
  | LoadFilterControlsAction
  | AddFilterControlsAction
  | ActivateItemOfFilterControlsAction
  | InactivateItemOfFilterControlsAction
  | ActiveCategoryOfFilterControlsAction
  | AddModelsInFilterControlsAction
  | SetControlValueAction
  | SetPropertyValueAction
  | ExpandFilterAction;
