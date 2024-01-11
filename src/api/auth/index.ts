import { SignUpInfo } from "../../models/auth";
import ApiManager from "../index";

export const postSignIn = async (signInInfo: SignUpInfo) => {
  const response = await ApiManager.post("/auth/sign-up", signInInfo);
  return response.data;
};
