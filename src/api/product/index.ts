import { ProductInfo, UpdateProductDTO } from "../../models/product";
import ApiManager from "..";

export const postProduct = async (productInfo: ProductInfo) => {
  const response = await ApiManager.post(`/products/register`, productInfo);
  return response.data;
};

export const updateProduct = async (productId: number, productInfo: UpdateProductDTO) => {
  const response = await ApiManager.patch(`/products/modify/${productId}`, productInfo);
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

export const getDeptPopularProducts = async (departmentId: number, page: number = 1) => {
  const response = await ApiManager.get(`/products?sort=popular&page=${page}&pageSize=4&departmentId=${departmentId}`);
  return response.data;
};

export const getProductDetail = async (productId: string) => {
  const response = await ApiManager.get(`/products/${productId}`);
  return response.data;
};

export const deleteProduct = async (productId: string) => {
  const response = await ApiManager.delete(`/products/${productId}`);
  return response;
};

export const sellProduct = async (productId: string) => {
  const response = await ApiManager.post(`/products/sell/${productId}`);
  return response;
};

export const getSearchResults = async (search: string, page: number, pageSize: number, departmentId?: number) => {
  const response = await ApiManager.get(
    `/products?search=${search}&sort=recent&page=${page}&pageSize=${pageSize}&departmentId=${
      departmentId ? departmentId : ""
    }`,
  );
  return response.data;
};

export const getSearchResultsCount = async (search: string, departmentId?: number) => {
  const response = await ApiManager.get(
    `/products/count?search=${search}&departmentId=${departmentId ? departmentId : ""}`,
  );
  return response.data;
};
