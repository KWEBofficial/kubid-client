import { ProductInfo } from "../../models/product";
import ApiManager from "..";

export const postProduct = async (productInfo: ProductInfo) => {
  const response = await ApiManager.post("/products", productInfo);
  return response.data;
};

export const getRecentProducts = async () => {
  const response = await ApiManager.get("/products?sort=recent&page=1&pageSize=4");
  return response.data;
};

export const getPopularProducts = async () => {
  const response = await ApiManager.get("/products?sort=popular&page=1&pageSize=4");
  return response.data;
};

export const getDeptPopularProducts = async (departmentId: number) => {
  const response = await ApiManager.get(`/products?sort=popular&page=1&pageSize=4&departmentId=${departmentId}`);
  return response.data;
};
