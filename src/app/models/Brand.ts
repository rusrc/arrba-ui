import { IItem } from './iItem';
import { TypeOfItems } from './typeOfItems';

export class Brand implements IItem  {
    isActive: boolean;
    isHead: boolean;
    isFirst: boolean;
    typeOfItems: TypeOfItems;
    ID: number;
    Name: string;
    Status: number;
    WatchWeightStatus: number;
    LikeValue: number;
    LikeCount: number;
}
