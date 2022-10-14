import { Actions, ActionTypes } from '../actions/card-item.actions';
import { Vehicle } from '../../../models/vehicle';
import { HttpErrorResponse } from '@angular/common/http';


export interface State {
  error: HttpErrorResponse;
  vehicle: Vehicle;
}

export const initialState: State = {
  error: null,
  vehicle: undefined
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD_CARD_ITEMS_SUCCESS:
      const vehicle = action.vehicle;
      return { ...state, vehicle: vehicle };

    case ActionTypes.LOAD_CARD_ITEMS_FAILED:
      const error = action.error;
      return { ...state, vehicle: undefined, error: error };

    default:
      return state;
  }
}

