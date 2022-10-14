import { NameMultiLangJsonObject } from './nameMultiLangJsonObject';
import { CategCollection } from './categCollection';
import { Category } from './category';


export class SuperCategory {
    ID: number;
    Alias: string;
    Order: number;
    Name: string;
    Status: number;
    SuperCategType: number;
    Index?: any;
    Controller?: any;
    CategCollection: CategCollection[];
    Categories: Category[];
    NameMultiLangJsonObject: NameMultiLangJsonObject;
    NameMultiLang: string;
    IsActive: boolean;
}
