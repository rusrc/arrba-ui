import { CountOfAdInBrandsList } from './countOfAdInBrandsList';

export interface CategsWithAdsByBrand {
    SuperCategID: number;
    SuperCategName: string;
    CategID: number;
    CategName: string;
    FileName: string;
    CountOfAdInBrandsList: CountOfAdInBrandsList[];
}
