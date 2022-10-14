import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action, select } from '@ngrx/store';
import * as fca from '../../actions/filterControl/filter-control.actions';
import { map, switchMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { of, empty } from 'rxjs';
import { FilterService } from '../../../common/services/filter/filter.service';
import { State, getAllFilterControls, getActiveCategoryId } from '../../reducers/index';
import { TypeOfItems } from '../../../models/typeOfItems';
import { ModelService } from '../../../common/services/Model/model.service';

@Injectable()
export class FilterControlEffects {

  /**
   * Listening the ActionTypes.LoadFilterControls type
   * and call AddFilterControlsAction action if controls not exists
   */
  @Effect() $LoadFilterControls = this.actions$
    // tslint:disable-next-line: deprecation
    .ofType<fca.Actions>(fca.ActionTypes.LoadFilterControls)
    .pipe(
      map((action: fca.LoadFilterControlsAction) => action.categoryId),
      // tslint:disable-next-line: deprecation
      withLatestFrom(this.store.select(getAllFilterControls)),
      switchMap(([categoryId, filterControls]) => {

        const filterControlsByCategoryId = filterControls[categoryId];
        if (!!filterControlsByCategoryId) {
          console.log('%cAlready exists not need to call new items', 'color: orange');
          return of(<fca.Actions>new fca.ActiveCategoryOfFilterControlsAction(categoryId));
        }

        console.log('%cControls not exists need call to server', 'color:green');
        const newAction = this.filterService.GetByCategoryId(categoryId).pipe(
          // tap(data => console.log('data: ', data)),
          map(data => {
            return <fca.Actions>new fca.AddFilterControlsAction({
              categoryId: categoryId,
              itemTypes: data[0],
              itemBrands: data[1],
              itemProperties: data[2],
              frequentSelectedCities: data[3]
            });
          }),
          catchError(error => of(new Error(error)))
        );

        return newAction;
      })
    );

  /**
   * Listnening ActionTypes.SetItemToActiveStatus type
   * If item is brand then get the models by brandId and categoryId
   */
  @Effect() $LoadModelsInFilterControls = this.actions$
    .pipe(
      ofType<fca.Actions>(fca.ActionTypes.SetItemToActiveStatus),
      map((action: fca.ActivateItemOfFilterControlsAction) => action.item),
      withLatestFrom(this.store.pipe(select(getActiveCategoryId))),
      switchMap(([item, categoryId]) => {

        if (item.typeOfItems === TypeOfItems.BrandType && item.isActive) {
          const newAction = this.modelService.GetAll(categoryId, item.ID).pipe(
            map(models => <fca.Actions>new fca.AddModelsInFilterControlsAction(models)),
            catchError(error => of(new Error(error)))
          );
          return newAction;
        }

        return of();
      })
    );



  constructor(
    private actions$: Actions,
    private filterService: FilterService,
    private modelService: ModelService,
    private store: Store<State>) { }
}
