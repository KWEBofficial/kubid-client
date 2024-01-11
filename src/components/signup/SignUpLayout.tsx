import React, { useState, useEffect } from "react";
import LargeInput from "../common/LargeInput";
import MatchingPasswordInput from "../common/MatchingPasswordInput";
import DepartmentInput from "./DepartmentInput";
import RegisterButton from "../common/RegisterButton";
import { SignUpInfo } from "../../models/auth";
import { postSignUp } from "../../api/auth";
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
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setSignUpForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    // Effect to handle the message after component renders
    if (isSignUpSuccessful) {
      messageApi.open({
        type: "success",
        content: "Welcome Back!",
      });
      // Reset the success state after showing the message
      setIsSignUpSuccessful(false);
    }
  }, [isSignUpSuccessful, messageApi]);

  const handleSubmit = async () => {
    const dataToSend: SignUpInfo = {
      email: signUpForm.email,
      nickname: signUpForm.nickname,
      password: signUpForm.password,
      departmentId: signUpForm.departmentId,
    };
    console.log(dataToSend);
    try {
      await postSignUp(dataToSend);
      // If postSignUp is successful, set the success state to trigger the message
      setIsSignUpSuccessful(true);
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
      <MatchingPasswordInput
        onPasswordChange={(value) => handleInputChange("password", value)}
        onPasswordMatchChange={(match) => handleInputChange("passwordsMatch", match)}
      />
      {/* LargeInput for Nickname */}
      <LargeInput placeholder="닉네임" value={signUpForm.nickname} onChange={(e) => handleInputChange("nickname", e)} />
      {/* DepartmentInput */}
      <DepartmentInput value={signUpForm.departmentId} onChange={(e) => handleInputChange("departmentId", e)} />
      {/* RegisterButton */}
      <RegisterButton disabled={!signUpForm.passwordsMatch || signUpForm.departmentId === 0} onClick={handleSubmit} />
    </Space>
  );
};
