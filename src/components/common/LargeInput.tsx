import React from "react";
import { Input } from "antd";
import "../../styles/global.css";

interface LargeInputProps {
  placeholder: string;
  value?: string; // Make the value prop optional
  onChange?: (value: string) => void; // Make the onChange prop optional
}

const LargeInput: React.FC<LargeInputProps> = ({ placeholder, value, onChange }) => (
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

export default LargeInput;
