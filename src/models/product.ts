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

export interface ProductDetailInfo {
  id: number;
  product_name: string;
  upper_bound: number;
  currentHighestPrice: number;
  image_id: string;
  description: string;
  tags: string[];
  tradeLocation: string;
  tradeDate: string;
  created_at: string;
  updated_at: string;
  department: string;
}
