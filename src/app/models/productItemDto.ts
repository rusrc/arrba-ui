import { Category } from './category';

export class ProductItemDto {
    brandName: string;
    modelName: string;
    pageNumber: number;
    keyValueParams: [{ key: string, value: string }];
    categoryName: string;
    category: Category;
    typeId: number;
    cityAlias: string;
}
