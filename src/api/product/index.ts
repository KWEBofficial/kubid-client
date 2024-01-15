import { ProductInfo } from "../../models/product";
import ApiManager from "..";

export const postProduct = async (productInfo: ProductInfo) => {
  console.log(1);
  const response = await ApiManager.post("/products", productInfo);
  console.error(response);
  console.log(123);
  return response.data;
};
