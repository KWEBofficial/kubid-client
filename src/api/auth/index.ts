import { SignUpInfo, SignInInfo } from "../../models/auth";
import ApiManager from "../index";

export const postSignUp = async (signUpInfo: SignUpInfo) => {
  const response = await ApiManager.post("/auth/sign-up", signUpInfo);
  console.log(response);
  return response
};

export const postSignIn = async (signInInfo: SignInInfo) => {
  const response = await ApiManager.post("/auth/sign-in", signInInfo);
  return response;
};
