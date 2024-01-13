import { PasswordChangeInfo } from "../../models/user";
import ApiManager from "../index";

export const patchPasswordChange = async (passwordChangeInfo: PasswordChangeInfo) => {
  const response = await ApiManager.patch("/users/current-user", passwordChangeInfo);
  return response;
};
