import { PasswordChangeInfo } from "../../models/user";
import ApiManager from "../index";

export const patchPasswordChange = async (passwordChangeInfo: PasswordChangeInfo) => {
  console.log("log at users/index.ts");
  const response = await ApiManager.patch("/users/current-user", passwordChangeInfo);
  console.log(response);
  console.log("second log at users/index.ts");
  return response;
};
