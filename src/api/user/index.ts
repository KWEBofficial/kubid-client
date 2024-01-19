import ApiManager from "../index";
import { PasswordChangeInfo, ProfileImageChangeInfo, NicknameChangeInfo } from "../../models/user";

export const getCurrentUser = async () => {
  const response = await ApiManager.get("/users/current-user");
  return response.data;
};
export const getSellingProduct = async (page: number, pageSize: number) => {
  const response = await ApiManager.get(`/users/current-user/product/sell?page=${page}&pageSize=${pageSize}`);
  return response.data;
};
export const getBuyingProduct = async (page: number, pageSize: number) => {
  const response = await ApiManager.get(`/users/current-user/product/buy?page=${page}&pageSize=${pageSize}`);
  return response.data;
};

export const patchUserDetails = async (details: PasswordChangeInfo | NicknameChangeInfo | ProfileImageChangeInfo) => {
  const response = await ApiManager.patch("/users/current-user", details);
  return response;
};
