import ApiManager from "../index";

export const getRecentProducts = async () => {
  // TODO: GET /products API 수정 필요. GET /products/popular 이런 식?
  const response = await ApiManager.get("/products");
  return response.data;
};
