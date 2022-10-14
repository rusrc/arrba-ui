import { SelectOption } from './selectOption';
import { ControlType } from './ControlType';

export class Property {
    constructor(
        name: string,
        type: ControlType,
        title?: string,
        value?: string | number | boolean,
        selectOptions?: Array<SelectOption>) {

        this.PropertyName = name;
        if (type) {
            this.ControlType = type.toString();
        }
        this.SelectOptions = selectOptions;
        this.PropertyDescription = title;
        this.PropertyValue = value;
    }
    PropertyID?: number;
    CategID?: number;
    Priority?: number;
    ControlType: string;
    AddToCard?: string;
    AddToFilter?: string;
    PropertyName: string;
    UnitMeasure: string;
    PropertyDescription?: string;
    PropertyActiveStatus?: string;
    PropertyGroupName?: string;
    PropertyValue?: any | string | number;
    SelectOptions?: Array<SelectOption>;
}
