import ApiManager from "../index";

export const getDepartments = async () => {
  const response = await ApiManager.get("/department/departments");
  return response.data;
};
