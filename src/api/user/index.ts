import ApiManager from "../index";

export const getCurrentUser = async () => {
  const response = await ApiManager.get("/users/current-user");
  return response.data;
};
