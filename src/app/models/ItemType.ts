import { NameMultiLangJsonObject } from './nameMultiLangJsonObject';
import { IItem } from '../models/iItem';
import { TypeOfItems } from '../models/typeOfItems';

export class ItemType implements IItem {
    isActive: boolean;
    isHead: boolean;
    isFirst: boolean;
    typeOfItems: TypeOfItems;

    ID: number;
    Name: string;
    Comment?: any;
    Status: number;
    WatchWeightStatus: number;
    NameMultiLangJsonObject: NameMultiLangJsonObject;
    NameMultiLang: string;
    NameMultiLangJson: string;
}
