import React, { useState } from "react";
import PasswordInput from "../../components/signup/PasswordInput";
import MatchingPasswordInput from "../../components/signup/MatchingPasswordInput";
import BlueButton from "../../components/signup/BlueButton";
import GrayButton from "../../components/passwordchange/GrayButton";
import { PasswordChangeInfo } from "../../models/user";
import { patchUserDetails } from "../../api/users";
import { message, Space } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";
import { useNavigate } from "react-router-dom";
import { postSignIn } from "../../api/auth";
import { SignInInfo } from "../../models/auth";

export const PasswordChangeTag: React.FC = () => {
  const navigate = useNavigate();

  const [changePasswordForm, setChangePasswordForm] = useState({
    curPassword: "",
    newPassword: "",
  });

  const parseJwt = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload);
  };

  const token = localStorage.getItem("_auth");
  if (token === null) {
    navigate("/");
    return null;
  }
  const decodedToken = parseJwt(token);
  const decodedEmail = decodedToken.email;
  const [messageApi, contextholder] = message.useMessage();

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setChangePasswordForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const handlePasswordChange = async () => {
    const dataToSendLogin: SignInInfo = {
      email: decodedEmail,
      password: changePasswordForm.curPassword,
    };
    const dataToSendPasswordChange: PasswordChangeInfo = {
      password: changePasswordForm.newPassword,
    };
    try {
      await postSignIn(dataToSendLogin).then((res) => {
        if (res.status === 200) {
          patchUserDetails(dataToSendPasswordChange);
          navigate("/");
        } else {
          throw Error;
        }
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        // 여기서 비밀번호가 틀렸을 때의 처리를 추가합니다.
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
    <>
      {contextholder}
      <Space direction="vertical">
        <PasswordInput onPasswordChange={(value) => handleInputChange("curPassword", value)} />
        <MatchingPasswordInput
          onPasswordChange={(value) => handleInputChange("newPassword", value)}
          placeholders={["새로운 비밀번호", "새로운 비밀번호 재입력"]}
        />
        <BlueButton
          placeholder="수정하기"
          disabled={!changePasswordForm.curPassword || !changePasswordForm.newPassword}
          onClick={handlePasswordChange}
        />
        <GrayButton placeholder="취소하기" onClick={() => navigate("/")} />
      </Space>
    </>
  );
};
