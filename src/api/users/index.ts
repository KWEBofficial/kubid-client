import { PasswordChangeInfo, ProfileImageChangeInfo, NicknameChangeInfo } from "../../models/user";
import ApiManager from "../index";

export const patchUserDetails = async (details: PasswordChangeInfo | NicknameChangeInfo | ProfileImageChangeInfo) => {
  const response = await ApiManager.patch("/users/current-user", details);
  return response;
};
