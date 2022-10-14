import { AddToCard } from '../common/enums/AddToCard';
import { AddToFilter } from '../common/enums/AddToFilter';
import { ISelectOption } from './iSelectOption';
import { ControlType } from '../models/ControlType';

export interface IProperty {
    Name: string;
    Description: string;
    ControlType: ControlType;
    Priority: number;
    PropertyID: number;
    AddToCard: AddToCard;
    AddToFilter: AddToFilter;
    SelectOptions: ISelectOption;
    /**Check if value undefined*/
    ifOk(value: string): string;
}
