import React, { useState } from "react";
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>("");
  const [departmentId, setDepartmentId] = useState<number>();

  const [messageApi] = message.useMessage();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handlePasswordMatchChange = (match: boolean) => {
    setPasswordsMatch(match);
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
  };

  const handleDepartmentChange = (value: number) => {
    setDepartmentId(value);
  };

  const handleSubmit = async () => {
    const dataToSend: SignUpInfo = {
      email,
      nickname,
      password,
      departmentId,
    };
    console.log(dataToSend);
    try {
      await postSignIn(dataToSend);
      messageApi.open({
        type: "success",
        content: "Welcome Back!",
      });
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
      <LargeInput placeholder="이메일" value={email} onChange={(e) => handleEmailChange(e)} />
      <PasswordInput onPasswordChange={handlePasswordChange} onPasswordMatchChange={handlePasswordMatchChange} />
      <LargeInput placeholder="닉네임" value={nickname} onChange={(e) => handleNicknameChange(e)} />
      <DepartmentInput value={departmentId} onChange={(e) => handleDepartmentChange(e)} />
      <RegisterButton disabled={!passwordsMatch} onClick={handleSubmit} />
    </Space>
  );
};
