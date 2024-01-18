export interface ProductInfo {
  productName: string;
  desc: string;
  upperBound: number;
  lowerBound: number;
  department: string;
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
  product_name: string;
  user_id: number;
  status: string;
  user_highest_price: number;
  upper_bound: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;
  current_highest_price: number;
  image: {
    id: number;
    url: string;
  };
  bidderCount: number;
}
export interface CurrentUserSell {
  id: number;
  product_name: string;
  user_id: number;
  status: string;
  upper_bound: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;
  current_highest_price: number;
  image: {
    id: number;
    url: string;
  };
  bidderCount: number;
}
