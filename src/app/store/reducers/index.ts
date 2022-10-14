import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  combineReducers
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromFilterControl from './FilterControl/filter-control.reducer';
import * as fromFilter from './roomItemsFilter/room-items-filter.reducer';
import * as fromCardItem from '../../pages/card-page/reducers/card-item.reducer';
import * as fromCategories from './../../common/components/header/reducers/categories.reducer';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';


export interface State {
  filterReducer: fromFilterControl.State;
  roomItemsReducer: fromFilter.State;
  cardItemReducer: fromCardItem.State;
  categoriesReducer: fromCategories.State;
  routerFromRootReducer: RouterReducerState<any>;
}

export const rootReducer: ActionReducerMap<State> = {
  filterReducer: fromFilterControl.reducer,
  roomItemsReducer: fromFilter.reducer,
  cardItemReducer: fromCardItem.reducer,
  categoriesReducer: fromCategories.reducer,
  routerFromRootReducer: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

/* ************************* Filter controls ******************************/
export const getfilterControlState = createFeatureSelector<fromFilterControl.State>('filterReducer');
export const getActiveFilterControls = createSelector(getfilterControlState, fromFilterControl.getActiveFilterControlsProjector);
export const getActiveModels = createSelector(getfilterControlState, fromFilterControl.getActiveModelsProjector);
export const getAllFilterControls = createSelector(getfilterControlState, fromFilterControl.getAllFilterControlsProjector);
export const getChangedControl = (controlName: string) => createSelector(
  getfilterControlState,
  (state) => state.filterControls[state.selected][controlName]
);
export const getActiveCategoryId = createSelector(getfilterControlState, fromFilterControl.getActiveCategoryProjector);
export const getSelectedSearchData = createSelector(getfilterControlState, fromFilterControl.getSelectedSearchDataProjector);
export const getExpandedFilterFlag = createSelector(getfilterControlState, fromFilterControl.getExpandedFilterFlagProjector);

/* ************************* Room filter ******************************/
export const getRoomVehiclesState = createFeatureSelector<fromFilter.State>('roomItemsReducer');
export const getAdVehiclesForRoomFilter = createSelector(getRoomVehiclesState, fromFilter.getAdVehiclesFilterProjector);
export const getItemsCountByStatusForRoomFilter = createSelector(getRoomVehiclesState, fromFilter.getItemsCountByStatusProjector);
export const getItemsCountByCategoryForRoomFilter = createSelector(getRoomVehiclesState, fromFilter.getItemsCountByCategoryProjector);

/* ************************* Card page ******************************/
export const getVehicleState = createFeatureSelector<fromCardItem.State>('cardItemReducer');
export const getVehicle = createSelector(getVehicleState, (state: fromCardItem.State) => state.vehicle);
export const getVehicleFailed = createSelector(getVehicleState, (state: fromCardItem.State) => state.error);

/* ************************* Categories ******************************/
export const getSuperCategoriesState = createFeatureSelector<fromCategories.State>('categoriesReducer');
export const getSelectedJobId = createSelector(getSuperCategoriesState, fromCategories.getSelectedSuperCategoryId);
export const getAllSuperCategories = createSelector(getSuperCategoriesState, fromCategories.selectAll);
export const getActiveCategory = createSelector(getSuperCategoriesState, fromCategories.getActiveCategory); // TODO not used
export const getIsLoading = createSelector(getSuperCategoriesState, fromCategories.getSelectedSuperIsLoading);
export const getIsLoaded = createSelector(getSuperCategoriesState, fromCategories.getSelectedSuperIsLoaded);

/* ************************* NgRx Router ***************************** */
export const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState<any>>('routerFromRootReducer');

const {
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = fromRouter.getSelectors(selectRouter);

// export const selectRouteId = selectRouteParam('id');
// export const selectStatus = selectQueryParam('status');
export const selectRouterParams = createSelector(selectRouteParams, params => params);
export const selectRouterQueryParams = createSelector(selectQueryParams, params => params);
export const selectRouterAllParams = createSelector(selectRouteParams, selectQueryParams, (p1, p2) => {
  return ({ p1, p2 });
});
