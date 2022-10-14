import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import * as fromActions from '../actions/categories.actions';
import { of } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { SuperCategory } from '../../../../models/superCategory';
import { SuperCategoryService } from '../../../../common/services/SuperCategory/super-category.service';
import { MessageService } from '../../../../common/services/message/message.service';

const CATEGORIES_ITEM = makeStateKey('CATEGORIES_ITEM');

@Injectable()
export class CategoriesEffects {

  @Effect() $LoadSuperCategories = this.actions$.pipe(
    ofType<fromActions.Actions>(fromActions.ActionTypes.LOAD_SUPERCATEGORIES),
    switchMap(() => {
      const transferData = this.transferState.get(CATEGORIES_ITEM, null as SuperCategory[]);
      this.removeTransferStateIfClient();

      if (transferData) {
        return of(new fromActions.LoadSuperCategoriesSuccessAction(transferData));
      } else {
        return this.superCategoryService.GetAll().pipe(
          map(superCategories => superCategories
            .map(this.resetActiveStatus)
            .map(this.setActiveStatusToFirstElement)
          ),
          tap(superCategories => this.setItemForTransferStateIfServer(superCategories)),
          map(superCategories => new fromActions.LoadSuperCategoriesSuccessAction(superCategories)),
          catchError(error => (this.messageService.throwError(error), of(new fromActions.LoadSuperCategoriesFailedAction(error))))
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private superCategoryService: SuperCategoryService,
    private messageService: MessageService) { }

  private removeTransferStateIfClient() {
    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(CATEGORIES_ITEM);
    }
  }

  private setItemForTransferStateIfServer(items: SuperCategory[]) {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(CATEGORIES_ITEM, items);
    }
  }

  private resetActiveStatus(sc: SuperCategory) {
    return Object.assign(sc, { IsActive: false });
  }

  private setActiveStatusToFirstElement(sc: SuperCategory, index: number) {
    if (index === 0) {
      return Object.assign(sc, { IsActive: true });
    } else {
      return sc;
    }
  }
}
