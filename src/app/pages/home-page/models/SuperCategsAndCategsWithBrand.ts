import { CategoryWithBrands } from './CategoryWithBrands';


export interface SuperCategsAndCategsWithBrand {
    CityName: string;
    SuperCategoryId: number;
    SuperCategoryName: string;
    SuperCategoryAlias: string;
    Categories: CategoryWithBrands[];
}
