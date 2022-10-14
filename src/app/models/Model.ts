import { IItem } from './iItem';
import { TypeOfItems } from './typeOfItems';


export class Model implements IItem {
    isActive: boolean;
    isHead: boolean;
    isFirst: boolean;
    typeOfItems: TypeOfItems;

    ID: number;
    ItemModelGroupID?: any;
    CategID: number;
    ItemTypeID: number;
    BrandID: number;
    Name: string;
    Status: number;
    WatchWeightStatus: number;
    LikeValue: number;
    LikeCount: number;
    ItemModelGroup?: any;
}
