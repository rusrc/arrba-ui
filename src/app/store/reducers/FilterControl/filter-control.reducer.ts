import { Actions, ActionTypes } from '../../actions/filterControl/filter-control.actions';
import { IFilterControls } from '../../../models/iFilterControls';
import { TypeOfItems } from '../../../models/typeOfItems';
import { HEAD_COUNT } from '../../../common/constants/constants';
import { IItemExtended } from '../../../models/iItemExtended';

// TODO remove TypeOfItems if from server items have the TypeOfItems
const setActiveHeads = function (item: IItemExtended, index: number) {
  if (index < HEAD_COUNT) {
    return Object.assign(item, { isHead: true });
  } else {
    return Object.assign(item, { isHead: false });
  }
};

const setIsHead = function (item: IItemExtended, index: number) {
  return Object.assign(item, { isHead: false, isActive: false });
};

const processItems = function (items: IItemExtended[], typeOfItem: TypeOfItems) {
  return items.map(setIsHead)
    .map(setActiveHeads)
    .map(e => Object.assign(e, { typeOfItems: typeOfItem }));
};

const toggleActive = function (items: IItemExtended[], currentItem: IItemExtended) {
  return items
    .map(setActiveHeads)
    .map(t => {
      if (t.ID === currentItem.ID && t.typeOfItems === currentItem.typeOfItems && !t.isActive) {
        return Object.assign(t, { isActive: true, isHead: true });
      } else {
        return Object.assign(t, { isActive: false });
      }
    });
};

export interface State {
  ids: number[];
  filterControls: { [id: number]: IFilterControls };
  selected: number;
  filterExpanded: string;
}

export const initialState: State = {
  ids: [],
  filterControls:
  {
    0: {
      categoryId: 0
    }
  },
  selected: 0,
  filterExpanded: 'inactive'
};

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {

    case ActionTypes.AddFilterControls:
      const newControls = action.filterControls;
      newControls.itemTypes = processItems(newControls.itemTypes, TypeOfItems.ItemType);
      newControls.itemBrands = processItems(newControls.itemBrands, TypeOfItems.BrandType);
      newControls.frequentSelectedCities = processItems(newControls.frequentSelectedCities, TypeOfItems.CityType);

      return {
        ...state,
        ids: [...state.ids, ...[newControls.categoryId]],
        filterControls: {
          ...state.filterControls,
          ... { [newControls.categoryId]: { ...state.filterControls[state.selected], ...newControls } }
        },
        selected: newControls.categoryId,
        filterExpanded: 'active'
      };

    case ActionTypes.SetItemToActiveStatus:
      let item = action.item;
      let filterControl = state.filterControls[state.selected];

      if (item.typeOfItems === TypeOfItems.ItemType) {
        filterControl.itemTypes = toggleActive(filterControl.itemTypes, item);
        filterControl.typeId = item.ID;
      }
      if (item.typeOfItems === TypeOfItems.BrandType) {
        filterControl.itemBrands = toggleActive(filterControl.itemBrands, item);
        filterControl.brandId = item.ID;
      }
      if (item.typeOfItems === TypeOfItems.ModelType) {
        filterControl.itemModels = toggleActive(filterControl.itemModels, item);
        filterControl.modelId = item.ID;
      }
      if (item.typeOfItems === TypeOfItems.CityType) {
        filterControl.frequentSelectedCities = toggleActive(filterControl.frequentSelectedCities, item);
        filterControl.cityId = item.ID;
      }

      console.log(state.filterControls, filterControl);
      return {
        ...state,
        filterControls: { ...state.filterControls, ...filterControl }
      };

    case ActionTypes.SetItemToInactiveStatus:
      item = action.item;
      filterControl = state.filterControls[state.selected];

      if (item.typeOfItems === TypeOfItems.ItemType) {
        filterControl.itemTypes = toggleActive(filterControl.itemTypes, item);
        filterControl.typeId = 0;
      }
      if (item.typeOfItems === TypeOfItems.BrandType) {
        filterControl.itemBrands = toggleActive(filterControl.itemBrands, item);
        filterControl.brandId = 0;
      }
      if (item.typeOfItems === TypeOfItems.ModelType) {
        filterControl.itemModels = toggleActive(filterControl.itemModels, item);
        filterControl.modelId = 0;
      }
      if (item.typeOfItems === TypeOfItems.CityType) {
        filterControl.frequentSelectedCities = toggleActive(filterControl.frequentSelectedCities, item);
        filterControl.cityId = 0;
      }

      return {
        ...state,
        filterControls: { ...state.filterControls, ...filterControl }
      };

    case ActionTypes.ActiveCategory:
      const categoryId = action.categoryId;
      return {
        ...state,
        selected: categoryId,
        filterExpanded: 'active'
      };

    case ActionTypes.AddModelsInFilterControls:
      const models = action.models.map(setActiveHeads);
      filterControl = state.filterControls[state.selected];
      filterControl.itemModels = models;
      return {
        ...state,
        filterControls: { ...state.filterControls }
      };

    case ActionTypes.SetControlValue:
      const control = action.control;
      filterControl = state.filterControls[state.selected];
      filterControl[control.property.PropertyName] = control.property.PropertyValue || control.value || '';

      return {
        ...state,
        filterControls: { ...state.filterControls }
      };

    case ActionTypes.SetPropertyValue:
      const property = action.property;
      filterControl = state.filterControls[state.selected];
      filterControl.itemProperties = filterControl.itemProperties.map(p => p.PropertyID === property.PropertyID ? property : p);
      return {
        ...state,
        filterControls: { ...state.filterControls }
      };

    case ActionTypes.ExpandFilter:
      return {
        ...state,
        filterExpanded: action.filterExpanded
      };

    default:
      return state;
  }
}

export const getActiveFilterControlsProjector = (state: State) => state.filterControls[state.selected];
export const getActiveModelsProjector = (state: State) => state.filterControls[state.selected].itemModels;
export const getAllFilterControlsProjector = (state: State) => state.filterControls;
export const getActiveCategoryProjector = (state: State) => state.filterControls[state.selected].categoryId;

export const getSelectedSearchDataProjector = (state: State) => {
  const controls = state.filterControls[state.selected];
  const result = {
    brandName: getSafe(() => controls.itemBrands.find(e => e.isActive).Name),
    modelName: getSafe(() => controls.itemModels.find(e => e.isActive).Name),
  };
  return result;
};

export const getExpandedFilterFlagProjector = (state: State) => state.filterExpanded;

function getSafe(fun) {
  try {
    return fun();
  } catch (error) {
    return undefined;
  }
}