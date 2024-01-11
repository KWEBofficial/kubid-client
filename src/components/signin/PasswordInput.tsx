import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";
import "../../styles/global.css";

interface PasswordInputProps {
  onPasswordChange: (value: string) => void;
  onPasswordMatchChange: (match: boolean) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange, onPasswordMatchChange }) => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handlePasswordChange = (value: string, field: "password1" | "password2") => {
    const newPassword = value;
    onPasswordChange(newPassword);

    if (field === "password1") {
      setPassword1(value);
    } else {
      setPassword2(value);
    }

    // 입력한 두 개의 비밀번호가 같은지 확인합니다.
    const match = field === "password1" ? value === password2 : value === password1;
    setPasswordsMatch(match);
    onPasswordMatchChange(match);
  };

  return (
    <Space direction="vertical">
      <Input.Password
        placeholder="비밀번호"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={password1}
        onChange={(e) => handlePasswordChange(e.target.value, "password1")}
        style={{
          width: "328px",
          height: "50px",
          marginBottom: "10px",
        }}
        className="input-style"
      />
      <Input.Password
        placeholder="비밀번호 재입력"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={password2}
        onChange={(e) => handlePasswordChange(e.target.value, "password2")}
        style={{ width: "328px", height: "50px" }}
        className="input-style"
      />
      <p
        style={{
          color: !passwordsMatch ? "red" : "#F5F5F5",
          height: "10px",
          userSelect: "none", // 드래그 안되게 설정했습니다.
          marginTop: "0px",
          marginBottom: "10px",
        }}
      >
        Passwords do not match.
      </p>
    </Space>
  );
};

export default PasswordInput;
