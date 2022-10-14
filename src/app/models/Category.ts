import { NameMultiLangSingularJsonObject } from './nameMultiLangSingularJsonObject';
import { NameMultiLangJsonObject } from './NameMultiLangJsonObject';

export interface Category {
    ID: number;
    SuperCategID: number;
    CategGroupID: number;
    Alias: string;
    HideModelField: boolean;
    Ads?: any;
    Name: string;
    FileName: string;
    Status: number;
    MainImg: string;
    NameMultiLangSingular: string;
    NameMultiLangSingularJsonObject: NameMultiLangSingularJsonObject;
    NameMultiLangJsonObject: NameMultiLangJsonObject;
    NameMultiLang: string;
    IsActive: boolean;
}
