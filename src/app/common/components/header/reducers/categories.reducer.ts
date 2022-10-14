import { SuperCategory } from '../../../../models/superCategory';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as fromCategories from '../actions/categories.actions';

export interface State extends EntityState<SuperCategory> {
  loaded: boolean;
  loading: boolean;
  selectedSuperCategoryID: number | null;
}

export const adapter = createEntityAdapter<SuperCategory>({
  selectId: (superCategory: SuperCategory) => superCategory.ID,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
  selectedSuperCategoryID: null
});

export function reducer(state = initialState, action: fromCategories.Actions): State {
  switch (action.type) {
    case fromCategories.ActionTypes.LOAD_SUPERCATEGORIES:
      return { ...state, loaded: false, loading: true };
    case fromCategories.ActionTypes.LOAD_SUPERCATEGORIES_SUCCESS:
      return adapter.addMany(action.items, { ...state, loaded: true, loading: false });
    case fromCategories.ActionTypes.ACTIVATE_SUPERCATEGORY:
      return adapter.updateMany(Object.values(state.entities).map(sc => (
        {
          id: sc.ID,
          changes: { IsActive: sc.ID === action.superCategory.ID }
        })),
        state);
    case fromCategories.ActionTypes.ACTIVATE_CATEGORY:
      const category = action.category;
      const categories = state.entities[category.SuperCategID].Categories;

      return adapter.updateOne({
        id: category.SuperCategID,
        changes: {
          Categories: categories.map(c => (c.IsActive = c.ID === category.ID, c))
        }
      }, state);
    default:
      return state;
  }
}

export const getSelectedSuperCategoryId = (state: State) => state.selectedSuperCategoryID;
export const getSelectedSuperIsLoading = (state: State) => state.loading;
export const getSelectedSuperIsLoaded = (state: State) => state.loaded;
export const getActiveCategory = (state: State) => {
  console.log('getActiveCategory: ', state);
  // TODO change find to state.entities[selectedSuperCategoryID]
  const category = Object.values(state.entities).find(sc => sc.IsActive).Categories.find(c => c.IsActive);
  return category;
};
export const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();
