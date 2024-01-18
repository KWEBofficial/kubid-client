import React, { useState, KeyboardEvent } from "react";
import LargeInput from "../../components/signup/LargeInput";
import PasswordInput from "../../components/signup/PasswordInput";
import BlueButton from "../../components/signup/BlueButton";
import { SignInInfo } from "../../models/auth";
import { postSignIn } from "../../api/auth";
import { message, Space } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

export const SignInTag: React.FC = () => {
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setSignInForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };
  const signIn = useSignIn();
  const navigate = useNavigate();
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "비밀번호를 다시 입력해주세요",
    });
  };

  const handleSubmit = async () => {
    const dataToSend: SignInInfo = {
      email: signInForm.email,
      password: signInForm.password,
    };
    try {
      await postSignIn(dataToSend).then((res) => {
        if (res.status === 200) {
          if (
            signIn({
              auth: {
                token: res.data.token,
                type: "Bearer",
              },
            })
          ) {
            navigate("/");
          }
        } else {
          throw Error;
        }
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        // 여기서 비밀번호가 틀렸을 때의 처리를 추가합니다.
        if (error.response?.status === 401) {
          // 또는 서버에서 반환하는 적절한 상태 코드
          warning(); // 비밀번호가 틀렸을 때 warning 함수 호출
          return;
        }
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
      {contextHolder}
      <Space direction="vertical">
        <LargeInput placeholder="이메일" value={signInForm.email} onChange={(e) => handleInputChange("email", e)} />
        <PasswordInput onPasswordChange={(value) => handleInputChange("password", value)} onKeyPress={handleKeyPress} />
        <BlueButton placeholder="로그인" disabled={!signInForm.email || !signInForm.password} onClick={handleSubmit} />
      </Space>
    </>
  );
};
