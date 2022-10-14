export interface ISeoDto {
    title: string;
    h1: string;
    metaDescription: string;
    metaKeys: string;
    breadcrumbs: [
        { Key: string, Value: string[] }
    ];
}
