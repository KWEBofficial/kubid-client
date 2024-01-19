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

export interface UpdateProductDTO {
  productName: string;
  desc: string;
  upperBound: number;
  lowerBound: number;
  imageId: number;
  tradingPlace: string;
  tradingTime: string;
}

export interface ProductThumbnailInfo {
  id: number;
  productName: string;
  departmentName: string;
  lowerBound: number;
  currentHighestPrice: number | null;
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

export interface CurrentUserBuy {
  id: number;
  productName: string;
  departmentName: string;
  lowerBound: number;
  currentHighestPrice: number;
  upperBound: number;
  imageUrl: string;
  bidderCount?: number;
  user_id: number;
  status: string;
  user_highest_price: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;
  image: {
    id: number;
    url: string;
  };
}
export interface CurrentUserSell {
  id: number;
  productName: string;
  departmentName: string;
  lowerBound: number;
  currentHighestPrice: number;
  upperBound: number;
  imageUrl: string;
  bidderCount?: number;
  user_id: number;
  status: string;
  department_id: number;
  created_at: Date;
  updated_at: Date;
  image: {
    id: number;
    url: string;
  };
}
