export interface ProductInfo {
    id: number;
    product_name: string;
    desc : string;
    upperBound: number;
    lowerBound: number;
    department: string;
    imageId: number;
    tags: string[];
    tradeLocation: string;
    tradeDate: string;
}