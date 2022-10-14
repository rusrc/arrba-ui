import { ImgJsonObject } from './imgJsonObject';

export interface HotItem {
    ID: number;
    CategID: number;
    FolderImgName: string;
    ModelName: string;
    TypeName?: any;
    CityName: string;
    Text?: any;
    Price: number;
    CurrencyName?: any;
    Year: string;
    ImgJson: string;
    ImgJsonObject: ImgJsonObject;
    Title?: any;
}
