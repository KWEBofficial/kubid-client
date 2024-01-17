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
