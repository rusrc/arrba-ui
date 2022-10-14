import { TypeOfItems } from './typeOfItems';
import { IItem } from './iItem';

export interface IItemExtended extends IItem {
    /*Те элементы которые всегда вверху, количество задается в конструкторе*/
    isHead?: boolean;
    isFirst?: boolean;
    isActive: boolean;
    typeOfItems?: TypeOfItems;
}
