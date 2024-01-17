import { PasswordChangeInfo, ProfileImageChangeInfo } from "../../models/user";
import { NicknameChangeInfo } from "../../models/user";
import ApiManager from "../index";

export const patchPasswordChange = async (passwordChangeInfo: PasswordChangeInfo) => {
  const response = await ApiManager.patch("/users/current-user/password", passwordChangeInfo);
  return response;
};
export const patchNicknameChange = async (nicknameChangeInfo: NicknameChangeInfo) => {
  const response = await ApiManager.patch("/users/current-user/nickname", nicknameChangeInfo);
  return response;
};
export const patchImageChange = async (profileImageChangeInfo: ProfileImageChangeInfo) => {
  const response = await ApiManager.patch("/users/current-user/image", profileImageChangeInfo);
  return response;
};
