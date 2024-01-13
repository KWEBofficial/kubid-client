import React from "react";
import { Button, Typography } from "antd";

const { Text } = Typography;

interface BlueButtonProps {
  disabled: boolean;
  onClick: () => void;
  placeholder: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({ disabled, onClick, placeholder }) => (
  <Button
    type="primary"
    disabled={disabled}
    style={{
      width: "328px",
      height: "50px",
      marginBottom: "10px",
    }}
    onClick={onClick}
  >
    <Text strong style={{ color: disabled ? "black" : "white" }}>
      {placeholder}
    </Text>
  </Button>
);

export default BlueButton;
