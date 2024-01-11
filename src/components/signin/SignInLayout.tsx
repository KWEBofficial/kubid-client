import React, { useState, useEffect } from "react";
import LargeInput from "../common/LargeInput";
import PasswordInput from "./PasswordInput";
import RegisterButton from "../common/RegisterButton";
import { SignInInfo } from "../../models/auth";
import { postSignIn } from "../../api/auth";
import { message, Space } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";

export const SignInTag: React.FC = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  const [messageApi] = message.useMessage();
  const [isSignInSuccessful, setIsSignInSuccessful] = useState(false);

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setSignInForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    // Effect to handle the message after component renders
    if (isSignInSuccessful) {
      messageApi.open({
        type: "success",
        content: "Welcome Back!",
      });
      // Reset the success state after showing the message
      setIsSignInSuccessful(false);
    }
  }, [isSignInSuccessful, messageApi]);

  const handleSubmit = async () => {
    const dataToSend: SignInInfo = {
      email: signInForm.email,
      password: signInForm.password,
    };
    console.log(dataToSend);
    try {
      await postSignIn(dataToSend);
      // If postSignIn is successful, set the success state to trigger the message
      setIsSignInSuccessful(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        messageApi.open({
          type: "error",
          content: error?.response?.data.message || COMMON_MESSAGE.SERVER_ERROR,
        });
        return;
      } else {
        messageApi.open({
          type: "error",
          content: COMMON_MESSAGE.UNKNOWN_ERROR,
        });
      }
    }
  };

  return (
    <Space direction="vertical">
      {/* LargeInput for Email */}
      <LargeInput placeholder="로그인" value={signInForm.email} onChange={(e) => handleInputChange("email", e)} />
      {/* PasswordInput */}
      <PasswordInput onPasswordChange={(value) => handleInputChange("password", value)} />
      {/* RegisterButton */}
      <RegisterButton disabled={!signInForm.password} onClick={handleSubmit} />
    </Space>
  );
};
