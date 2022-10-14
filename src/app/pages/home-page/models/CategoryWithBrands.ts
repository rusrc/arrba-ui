import { BrandWithCount } from './BrandWithCount';

export interface CategoryWithBrands {
    SuperCategoryId: number;
    SuperCategoryName: string;
    CategoryId: number;
    CategoryName: string;
    CategoryAlias: string;
    CategoryFileName: string;
    Brands: BrandWithCount[];
}
