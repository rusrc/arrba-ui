export interface Dealership {
    Id: number;
    CityId: number;
    UserId: number;
    Name: string;
    Email?: any;
    Address: string;
    SubwayStations: string;
    PhoneNumber: string;
    MapCoords?: any;
    OfficialDealer: boolean;
    MoWorkTime: string;
    TuWorkTime: string;
    WeWorkTime: string;
    ThWorkTime: string;
    FrWorkTime: string;
    SaWorkTime: string;
    SuWorkTime: string;
}
