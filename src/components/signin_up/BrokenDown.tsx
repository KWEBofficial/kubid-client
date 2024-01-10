import React, { useState, useEffect } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space, Select } from "antd";
import "../../styles/global.css";

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
    options={[
      { value: "", label: "학과를 선택해주세요", disabled: true }, // Set an option for the default label
      { value: "경영학과", label: "경영학과" },
      { value: "국어국문학과", label: "국어국문학과" },
      { value: "철학과", label: "철학과" },
      { value: "한국사학과", label: "한국사학과" },
      { value: "사학과", label: "사학과" },
      { value: "사회학과", label: "사회학과" },
      { value: "한문학과", label: "한문학과" },
      { value: "영어영문학과", label: "영어영문학과" },
      { value: "독어독문학과", label: "독어독문학과" },
      { value: "불어불문학과", label: "불어불문학과" },
      { value: "중어중문학과", label: "중어중문학과" },
      { value: "노어노문학과", label: "노어노문학과" },
      { value: "일어일문학과", label: "일어일문학과" },
      { value: "서어서문학과", label: "서어서문학과" },
      { value: "언어학과", label: "언어학과" },
      { value: "생명과학부", label: "생명과학부" },
      { value: "생명공학부", label: "생명공학부" },
      { value: "식품공학과", label: "식품공학과" },
      { value: "환경생태공학부", label: "환경생태공학부" },
      { value: "식품자원경제학과", label: "식품자원경제학과" },
      { value: "정치외교학과", label: "정치외교학과" },
      { value: "경제학과", label: "경제학과" },
      { value: "통계학과", label: "통계학과" },
      { value: "행정학과", label: "행정학과" },
      { value: "수학과", label: "수학과" },
      { value: "물리학과", label: "물리학과" },
      { value: "화학과", label: "화학과" },
      { value: "지구환경과학과", label: "지구환경과학과" },
      { value: "화공생명공학과", label: "화공생명공학과" },
      { value: "신소재공학부", label: "신소재공학부" },
      { value: "건축사회환경공학부", label: "건축사회환경공학부" },
      { value: "건축학과", label: "건축학과" },
      { value: "기계공학부", label: "기계공학부" },
      { value: "산업경영공학부", label: "산업경영공학부" },
      { value: "전기전자공학부", label: "전기전자공학부" },
      { value: "융합에너지공학과", label: "융합에너지공학과" },
      { value: "반도체공학과", label: "반도체공학과" },
      { value: "차세대통신학과", label: "차세대통신학과" },
      { value: "의학과", label: "의학과" },
      { value: "교육학과", label: "교육학과" },
      { value: "국어교육과", label: "국어교육과" },
      { value: "영어교육과", label: "영어교육과" },
      { value: "지리교육과", label: "지리교육과" },
      { value: "역사교육과", label: "역사교육과" },
      { value: "가정교육과", label: "가정교육과" },
      { value: "수학교육과", label: "수학교육과" },
      { value: "체육교육과", label: "체육교육과" },
      { value: "간호학과", label: "간호학과" },
      { value: "컴퓨터학과", label: "컴퓨터학과" },
      { value: "데이터과학과", label: "데이터과학과" },
      { value: "디자인조형학부", label: "디자인조형학부" },
      { value: "국제학부", label: "국제학부" },
      { value: "글로벌한국융합학부", label: "글로벌한국융합학부" },
      { value: "미디어학부", label: "미디어학부" },
      { value: "바이오의공학부", label: "바이오의공학부" },
      { value: "바이오시스템의과학부", label: "바이오시스템의과학부" },
      { value: "보건환경융합과학부", label: "보건환경융합과학부" },
      { value: "보건정책관리학부", label: "보건정책관리학부" },
      { value: "자유전공학부", label: "자유전공학부" },
      { value: "스마트보안학부", label: "스마트보안학부" },
      { value: "사이버국방학과", label: "사이버국방학과" },
      { value: "심리학부", label: "심리학부" },
      { value: "스마트모빌리티학부", label: "스마트모빌리티학부" },
    ]}
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
