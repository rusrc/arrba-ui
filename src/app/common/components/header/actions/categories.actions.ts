import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { SuperCategory } from '../../../../models/superCategory';
import { Category } from '../../../../models/category';


export enum ActionTypes {
  LOAD_SUPERCATEGORIES = '[SuperCategories] Load SuperCategories',
  LOAD_SUPERCATEGORIES_SUCCESS = '[SuperCategories] Load SuperCategories successfully',
  LOAD_SUPERCATEGORIES_FAILED = '[SuperCategories] Load SuperCategories failed',
  ACTIVATE_SUPERCATEGORY = '[SuperCategories] Activate SuperCategories',
  ACTIVATE_CATEGORY = '[SuperCategories] Activate Categories',
}

export class LoadSuperCategories implements Action {
  readonly type = ActionTypes.LOAD_SUPERCATEGORIES;
}

export class LoadSuperCategoriesSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUPERCATEGORIES_SUCCESS;
  constructor(public items: SuperCategory[]) { }
}

export class LoadSuperCategoriesFailedAction implements Action {
  readonly type = ActionTypes.LOAD_SUPERCATEGORIES_FAILED;
  constructor(public error: HttpErrorResponse) { }
}

export class ActivateSuperCategoryAction implements Action {
  readonly type = ActionTypes.ACTIVATE_SUPERCATEGORY;
  constructor(public superCategory: SuperCategory) { }
}

export class ActivateCategoryAction implements Action {
  readonly type = ActionTypes.ACTIVATE_CATEGORY;
  constructor(public category: Category) { }
}

export type Actions = LoadSuperCategories
  | LoadSuperCategoriesSuccessAction
  | LoadSuperCategoriesFailedAction
  | ActivateSuperCategoryAction
  | ActivateCategoryAction;
