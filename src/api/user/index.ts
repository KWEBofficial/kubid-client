import ApiManager from "../index";

export const getCurrentUser = async () => {
  const response = await ApiManager.get("/users/current-user");
  return response.data;
};
export const getSellingProduct = async (page: number, pageSize: number) => {
  const response = await ApiManager.get(`/users//current-user/product/sell?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
export const getBuyingProduct = async (page: number, pageSize: number) => {
  const response = await ApiManager.get(`/users//current-user/product/buy?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
