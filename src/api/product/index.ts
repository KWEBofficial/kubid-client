import ApiManager from "../index";

export const getRecentProducts = async () => {
  const response = await ApiManager.get("/products?sort=recent&page=1&pageSize=4");
  return response.data;
};

export const getPopularProducts = async () => {
  const response = await ApiManager.get("/products/popular?page=1&pageSize=4");
  return response.data;
};

export const getDeptPopularProducts = async (departmentId: number) => {
  const response = await ApiManager.get(`/products/popular?page=1&pageSize=4&departmentId=${departmentId}`);
  return response.data;
};
