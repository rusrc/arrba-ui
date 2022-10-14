import { IItem } from './iItem';

export class City implements IItem {
    ID: number;
    Name: string;
    Alias: string;
    RegionID: number;
    CountryID: number;
    Weight: number;
    NameMultiLang: string;

    isActive: boolean;
}
