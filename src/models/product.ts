export interface ProductInfo {
  productName: string;
  desc: string;
  upperBound: number;
  lowerBound: number;
  imageId: number;
  tags: string[];
  tradeLocation: string;
  tradeDate: string;
}

export interface ProductThumbnailInfo {
  id: number;
  productName: string;
  departmentName: string;
  lowerBound: number;
  currentHighestPrice: number;
  upperBound: number;
  imageUrl: string;
  bidderCount?: number;
}
