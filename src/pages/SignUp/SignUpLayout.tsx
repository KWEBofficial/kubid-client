import React, { useState } from "react";
import LargeInput from "../../components/signup/LargeInput";
import MatchingPasswordInput from "../../components/signup/MatchingPasswordInput";
import DepartmentInput from "./DepartmentInput";
import BlueButton from "../../components/signup/BlueButton";
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

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setSignUpForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    const dataToSend: SignUpInfo = {
      email: signUpForm.email,
      nickname: signUpForm.nickname,
      password: signUpForm.password,
      departmentId: signUpForm.departmentId,
    };
    try {
      await postSignUp(dataToSend);
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
      <LargeInput placeholder="이메일" value={signUpForm.email} onChange={(e) => handleInputChange("email", e)} />
      <MatchingPasswordInput
        onPasswordChange={(value) => handleInputChange("password", value)}
        placeholders={["비밀번호", "비밀번호 재입력"]}
      />
      <LargeInput placeholder="닉네임" value={signUpForm.nickname} onChange={(e) => handleInputChange("nickname", e)} />
      <DepartmentInput value={signUpForm.departmentId} onChange={(e) => handleInputChange("departmentId", e)} />
      <BlueButton
        placeholder="회원가입"
        disabled={
          !signUpForm.email ||
          !signUpForm.nickname ||
          !signUpForm.password ||
          !signUpForm.passwordsMatch ||
          signUpForm.departmentId === 0
        }
        onClick={handleSubmit}
      />
    </Space>
  );
};
