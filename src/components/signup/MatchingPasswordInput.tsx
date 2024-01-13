import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone, ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, Space, Typography } from "antd";

const { Text } = Typography;

interface MatchingPasswordInputProps {
  onPasswordChange: (value: string) => void;
  placeholders: string[];
}

let isPasswordMatch = true;

const MatchingPasswordInput: React.FC<MatchingPasswordInputProps> = ({ onPasswordChange, placeholders }) => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");

  const handlePasswordChange = (value: string, field: "password1" | "password2") => {
    const newPassword = value;
    onPasswordChange(newPassword);

    if (field === "password1") {
      setPassword1(value);
    } else {
      setPassword2(value);
    }

    // 입력한 두 개의 비밀번호가 같은지 확인합니다.
    isPasswordMatch = field === "password1" ? value === password2 : value === password1;
  };

  return (
    <Space direction="vertical" style={{ height: "150px" }}>
      <Input.Password
        placeholder={placeholders[0]}
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
        placeholder={placeholders[1]}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={password2}
        onChange={(e) => handlePasswordChange(e.target.value, "password2")}
        style={{ width: "328px", height: "50px" }}
        className="input-style"
      />
      {!isPasswordMatch && (
        <Text type="danger">
          <ExclamationCircleOutlined /> 비밀번호가 일치하지 않습니다.
        </Text>
      )}
    </Space>
  );
};

export default MatchingPasswordInput;
