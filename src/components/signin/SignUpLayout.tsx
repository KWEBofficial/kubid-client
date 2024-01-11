import React, { useState, useEffect } from "react";
import LargeInput from "./LargeInput";
import PasswordInput from "./PasswordInput";
import DepartmentInput from "./DepartmentInput";
import RegisterButton from "./RegisterButton";
import { SignUpInfo } from "../../models/auth";
import { postSignIn } from "../../api/auth";
import { message, Space } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";

export const SignUpTag: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordsMatch: true,
    nickname: "",
    departmentId: 0,
  });

  const [messageApi] = message.useMessage();
  const [isSignInSuccessful, setIsSignInSuccessful] = useState(false);

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setSignUpForm((prevForm) => ({
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
    const dataToSend: SignUpInfo = {
      email: signUpForm.email,
      nickname: signUpForm.nickname,
      password: signUpForm.password,
      departmentId: signUpForm.departmentId,
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
      <LargeInput placeholder="이메일" value={signUpForm.email} onChange={(e) => handleInputChange("email", e)} />
      {/* PasswordInput */}
      <PasswordInput
        onPasswordChange={(value) => handleInputChange("password", value)}
        onPasswordMatchChange={(match) => handleInputChange("passwordsMatch", match)}
      />
      {/* LargeInput for Nickname */}
      <LargeInput placeholder="닉네임" value={signUpForm.nickname} onChange={(e) => handleInputChange("nickname", e)} />
      {/* DepartmentInput */}
      <DepartmentInput value={signUpForm.departmentId} onChange={(e) => handleInputChange("departmentId", e)} />
      {/* RegisterButton */}
      <RegisterButton disabled={!signUpForm.passwordsMatch} onClick={handleSubmit} />
    </Space>
  );
};
