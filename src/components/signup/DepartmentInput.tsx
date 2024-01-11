import React from "react";
import { Select } from "antd";
import "../../styles/global.css";
import { DEPARTMENTS } from "../../data/department";

interface DepartmentInputProps {
  value: number;
  onChange: (value: number) => void;
}

const DepartmentInput: React.FC<DepartmentInputProps> = ({ value, onChange }) => (
  <Select
    value={value}
    style={{
      width: "328px",
      height: "50px",
      marginBottom: "20px",
    }}
    onChange={onChange}
  >
    {DEPARTMENTS.map((department) => (
      <Select.Option key={department.value} value={department.value} disabled={department.disabled}>
        {department.label}
      </Select.Option>
    ))}
  </Select>
);

export default DepartmentInput;
