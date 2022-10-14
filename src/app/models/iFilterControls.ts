import { Property } from './property';
import { IItemExtended } from './iItemExtended';

export interface IFilterControls {
    typeId?: number;
    brandId?: number;
    modelId?: number;
    cityId?: number;

    categoryId?: number;
    currencyId?: number;
    priceFrom?: number;
    priceTo?: number;
    yearFrom?: number;
    yearTo?: number;
    vehicleCondition?: number;
    instalmentSelling?: boolean;
    customsCleared?: boolean;
    hotSelling?: boolean;
    exchangePossible?: boolean;
    hasPhoto?: boolean;

    itemModels?: Array<IItemExtended>;
    itemTypes?: Array<IItemExtended>;
    itemBrands?: Array<IItemExtended>;
    frequentSelectedCities?: Array<IItemExtended>;
    itemProperties?: Array<Property>;
}
