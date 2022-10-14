import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromCardItem from '../actions/card-item.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { VehicleService } from '../../../common/services/Vehicle/vehicle.service';
import { Vehicle } from '../../../models/vehicle';
import { of } from 'rxjs';
import { MessageService } from '../../../common/services/message/message.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

const CARD_ITEM = makeStateKey('CARD_ITEM');

@Injectable()
export class CardItemEffects {

  @Effect() $LoadItem = this.actions$.pipe(
    ofType<fromCardItem.Actions>(fromCardItem.ActionTypes.LOAD_CARD_ITEMS),
    map((action: fromCardItem.LoadCardItemsAction) => action.itemId),
    switchMap(itemId => {
      const transferVehicle = this.transferState.get(CARD_ITEM, null as Vehicle);
      this.removeTransferStateIfClient();

      if (transferVehicle) {
        return of(new fromCardItem.LoadCardItemsSuccessAction(transferVehicle));
      } else {
        return this.vehicleService.getVehicle(itemId).pipe(
          tap(vehicle => this.setItemForTransferStateIfServer(vehicle)),
          map((vehicle: Vehicle) => new fromCardItem.LoadCardItemsSuccessAction(vehicle)),
          catchError(error => (this.messageService.throwError(error), of(new fromCardItem.LoadCardItemsFailedAction(error))))
        );
      }
    })
  );

  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private transferState: TransferState,
    private vehicleService: VehicleService,
    private messageService: MessageService) { }

  private removeTransferStateIfClient() {
    if (isPlatformBrowser(this.platformId)) {
      this.transferState.remove(CARD_ITEM);
    }
  }

  private setItemForTransferStateIfServer(item: Vehicle) {
    if (isPlatformServer(this.platformId)) {
      this.transferState.set(CARD_ITEM, item);
    }
  }
}
