import React, { useState } from "react";
import PasswordInput from "../../components/signup/PasswordInput";
import MatchingPasswordInput from "../../components/signup/MatchingPasswordInput";
import BlueButton from "../../components/signup/BlueButton";
import GrayButton from "../../components/passwordchange/GrayButton";
import { PasswordChangeInfo } from "../../models/user";
import { patchPasswordChange } from "../../api/users";
import { message, Space } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";
import { useNavigate } from "react-router-dom";

export const PasswordChangeTag: React.FC = () => {
  const [changePasswordForm, setChangePasswordForm] = useState({
    curPassword: "",
    newPassword: "",
    passwordsMatch: true,
  });

  const [messageApi] = message.useMessage();

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setChangePasswordForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const dataToSend: PasswordChangeInfo = {
      curPassword: changePasswordForm.curPassword,
      newPassword: changePasswordForm.newPassword,
      passwordsMatch: changePasswordForm.passwordsMatch,
    };
    console.log(dataToSend);
    try {
      await patchPasswordChange(dataToSend);
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
      <PasswordInput onPasswordChange={(value) => handleInputChange("curPassword", value)} />
      <MatchingPasswordInput
        onPasswordChange={(value) => handleInputChange("newPassword", value)}
        placeholders={["새로운 비밀번호", "새로운 비밀번호 재입력"]}
      />
      <BlueButton
        placeholder="수정하기"
        disabled={!changePasswordForm.curPassword || !changePasswordForm.passwordsMatch}
        onClick={handleSubmit}
      />
      <GrayButton placeholder="취소하기" onClick={() => navigate("/")} />
    </Space>
  );
};
