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
