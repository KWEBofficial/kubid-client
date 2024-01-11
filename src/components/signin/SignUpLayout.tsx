import React, { useState } from "react";
import { LargeInput, PasswordInput, DepartmentInput, RegisterButton } from "./BrokenDown";
import { SignUpInfo } from "../../models/auth";
import { postSignIn } from "../../api/auth";
import { message, Space } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";
import { DEPARTMENT } from "../../data/department";

export const SignUpTag: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

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

  const handleDepartmentChange = (value: string) => {
    setDepartment(value);
  };

  const handleSubmit = async () => {
    const dataToSend: SignUpInfo = {
      email,
      nickname,
      password,
      // TODO: departemnet를 name 말고 id로 관리하고 보낼 것
      departmentId: 1
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
      <DepartmentInput value={department} onChange={(e) => handleDepartmentChange(e)} />
      <RegisterButton disabled={!passwordsMatch} onClick={handleSubmit} />
    </Space>
  );
};
