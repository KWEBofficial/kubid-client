import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Space } from "antd";

interface PasswordInputProps {
  onPasswordChange: (value: string) => void;
  onEnterPress: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange, onEnterPress }) => {
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (value: string, field: "password") => {
    const newPassword = value;
    onPasswordChange(newPassword);

    if (field === "password") {
      setPassword(value);
    }
  };

  return (
    <Space direction="vertical">
      <Input.Password
        placeholder="비밀번호"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value, "password")}
        onPressEnter={onEnterPress}
        style={{
          width: "328px",
          height: "50px",
          marginBottom: "10px",
        }}
        className="input-style"
      />
    </Space>
  );
};

export default PasswordInput;
