import React, { useState } from "react";
import LargeInput from "../../components/signup/LargeInput";
import DepartmentInput from "./DepartmentInput";
import { SignUpInfo } from "../../models/auth";
import { postSignUp } from "../../api/auth";
import { message, Space, Form, Input, Button } from "antd";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";
import { sizeOfInput } from "../../styles/sizes";

export const SignUpTag: React.FC = () => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    nickname: "",
    departmentId: 0,
  });

  const [messageApi, contextholder] = message.useMessage();

  const handleInputChange = (fieldName: string, value: string | boolean | number) => {
    setSignUpForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateEmail = (_: any, value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("올바른 이메일 형식을 입력해주세요!"));
  };

  const handleSubmit = async () => {
    await validateEmail({}, signUpForm.email);
    const dataToSend: SignUpInfo = {
      email: signUpForm.email,
      nickname: signUpForm.nickname,
      password: signUpForm.password,
      departmentId: signUpForm.departmentId,
    };
    try {
      await postSignUp(dataToSend);
      navigate("/auth/sign-in");
    } catch (error) {
      console.log("ERROR: ", error);
      if (error instanceof AxiosError) {
        console.log("IS AXIOS ERROR");
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
        <Form scrollToFirstError onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "",
              },
              {
                required: true,
                message: "이메일을 입력해주세요",
              },
              {
                validator: validateEmail,
              },
            ]}
          >
            <LargeInput placeholder="이메일" value={signUpForm.email} onChange={(e) => handleInputChange("email", e)} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="비밀번호"
              value={signUpForm.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              style={sizeOfInput}
              className="input-style"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "비밀번호가 일치하지 않아요!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("비밀번호가 일치하지 않아요!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 재입력" style={sizeOfInput} className="input-style" />
          </Form.Item>
          <Form.Item>
            <LargeInput
              placeholder="닉네임"
              value={signUpForm.nickname}
              onChange={(e) => handleInputChange("nickname", e)}
            />
          </Form.Item>
          <Form.Item>
            <DepartmentInput value={signUpForm.departmentId} onChange={(e) => handleInputChange("departmentId", e)} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !signUpForm.email || !signUpForm.nickname || !signUpForm.password || signUpForm.departmentId === 0
              }
              style={{
                width: "328px",
                height: "50px",
                marginBottom: "10px",
                color:
                  !signUpForm.email || !signUpForm.nickname || !signUpForm.password || signUpForm.departmentId === 0
                    ? "black"
                    : "white",
              }}
            >
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </>
  );
};
