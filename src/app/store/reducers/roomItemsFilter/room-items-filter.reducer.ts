
import { Vehicle } from '../../../models/vehicle';
import { RoomItemsFilterActions, RoomItemsFilterActionTypes } from '../../actions/roomItemsFilter/room-items-filter.actions';
import { ItemState } from '../../../common/enums/ItemState';
import { ModirationStatus } from '../../../common/enums/ModirationStatus';


export interface State {
  activeStatus: ItemState;
  activeCategoryId: number;
  adVehicles: Vehicle[];
}

export const initialState: State = {
  activeStatus: ItemState.all,
  activeCategoryId: 0,
  adVehicles: []
};

export function reducer(state = initialState, action: RoomItemsFilterActions): State {
  switch (action.type) {

    case RoomItemsFilterActionTypes.LoadRoomItems:
      const adVehicles = action.adVehicles;
      return {
        ...state,
        adVehicles: adVehicles
      };
    case RoomItemsFilterActionTypes.SetActiveCategoryForRoomVehicles:
      return {
        ...state,
        activeCategoryId: action.categoryId
      };
    case RoomItemsFilterActionTypes.SetActiveStatusForItemsInFilterRoom:
      return {
        ...state,
        activeStatus: action.status
      };
    default:
      return state;
  }
}

/**
 * get advehicles for room filter
 */
export const getAdVehiclesFilterProjector = (state: State) => {
  let adVehicles = state.adVehicles;

  if (state.activeCategoryId) {
    adVehicles = adVehicles.filter(adVehicle => adVehicle.CategID === state.activeCategoryId);
  }

  return adVehicles;
};

/**
 * get items count by status for room
 * @param state - room items state
 */
export const getItemsCountByStatusProjector = (state: State) => {
  return [
    {
      Key: ItemState.all,
      Value: state.adVehicles.length,
      isActive: state.activeStatus === ItemState.all
    },
    {
      Key: ItemState.inArchive,
      Value: state.adVehicles.filter(adVehicle => adVehicle.IsExpired).length,
      isActive: state.activeStatus === ItemState.inArchive
    },
    {
      Key: ItemState.onModiration,
      Value: state.adVehicles.filter(adVehilce => adVehilce.ModirationStatus === ModirationStatus.required).length,
      isActive: state.activeStatus === ItemState.onModiration
    },
    {
      Key: ItemState.active,
      Value: state.adVehicles.filter(adVehicle => !adVehicle.IsExpired && adVehicle.ModirationStatus === ModirationStatus.ok).length,
      isActive: state.activeStatus === ItemState.active
    }];
};

/**
 * get items count by category projector
 * @param state - room items state
 */
export const getItemsCountByCategoryProjector = (state: State) => {
  let adVehicles = state.adVehicles;

  if (state.activeStatus === ItemState.inArchive) {
    adVehicles = adVehicles.filter(adVehicle => adVehicle.IsExpired);
  }
  if (state.activeStatus === ItemState.onModiration) {
    adVehicles = adVehicles.filter(adVehilce => adVehilce.ModirationStatus === ModirationStatus.required);
  }
  if (state.activeStatus === ItemState.active) {
    adVehicles = adVehicles.filter(adVehicle => !adVehicle.IsExpired && adVehicle.ModirationStatus === ModirationStatus.ok);
  }

  const groupedResult = Array.from(new Set(adVehicles.map(a => a.CategID)))
    .map(categID => {
      return {
        categoryId: categID,
        categoryName: adVehicles.find(a => a.CategID === categID).CategName,
        count: adVehicles.filter(a => a.CategID === categID).length
      };
    });

  return groupedResult.map(item => (
    {
      Key: item.categoryName,
      Value: item.count,
      isActive: item.categoryId === state.activeCategoryId,
      categoryId: item.categoryId
    }));
};

