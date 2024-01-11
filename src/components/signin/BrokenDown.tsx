import React, { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, Select } from "antd";
import "../../styles/global.css";
import { DEPARTMENT } from "../../data/department";

interface LargeInputProps {
  placeholder: string;
  value?: string; // Make the value prop optional
  onChange?: (value: string) => void; // Make the onChange prop optional
}

export const LargeInput: React.FC<LargeInputProps> = ({ placeholder, value, onChange }) => (
  <div className="button-container">
    <Input
      size="large"
      placeholder={placeholder}
      style={{
        width: "328px",
        height: "50px",
        marginBottom: "20px",
      }}
      className="placeholder-style"
      value={value} // Use the value prop
      onChange={(e) => onChange && onChange(e.target.value)} // Use the onChange prop if provided
    />
  </div>
);

interface PasswordInputProps {
  onPasswordChange: (value: string) => void;
  onPasswordMatchChange: (match: boolean) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ onPasswordChange, onPasswordMatchChange }) => {
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  useEffect(() => {
    // Check if passwords match whenever either password changes
    setPasswordsMatch(password1 === password2);
    // Communicate the password match status to the parent component
    onPasswordMatchChange(password1 === password2);
  }, [password1, password2, onPasswordMatchChange]);

  const handlePasswordChange = (value: string, field: "password1" | "password2") => {
    const newPassword = value;
    onPasswordChange(newPassword);
    if (field === "password1") {
      setPassword1(value);
    } else {
      setPassword2(value);
    }
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
          userSelect: "none", // Prevent text from being selectable/draggable
          marginTop: "0px",
          marginBottom: "10px",
        }}
      >
        Passwords do not match.
      </p>
    </Space>
  );
};

interface DepartmentInputProps {
  value: string; // Add the value prop
  onChange: (value: string) => void;
}

export const DepartmentInput: React.FC<DepartmentInputProps> = ({ value, onChange }) => (
  <Select
    // defaultValue="학과를 선택해주세요"
    value={value}
    style={{
      width: "328px",
      height: "50px",
      marginBottom: "20px",
    }}
    onChange={onChange}
    options={DEPARTMENT}
  />
);

interface RegisterButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export const RegisterButton: React.FC<RegisterButtonProps> = ({ disabled, onClick }) => (
  <Button
    type="primary"
    disabled={disabled}
    style={{ width: "328px", height: "50px", marginBottom: "10px" }}
    onClick={onClick}
  >
    Register
  </Button>
);
