import React, { useState } from "react";
import axios from "axios";
import { LargeInput, PasswordInput, DepartmentInput, RegisterButton } from "./BrokenDown";
import { Space } from "antd";

export const SignUpTag: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

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

  const handleSubmit = () => {
    const dataToSend = {
      email,
      nickname,
      password,
      department,
    };
    console.log(dataToSend);
    axios
      .post("/sign-up", dataToSend)
      .then((response) => {
        // Handle success, if needed
        console.log("Request successful", response.data);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Error sending request", error);
      });
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
