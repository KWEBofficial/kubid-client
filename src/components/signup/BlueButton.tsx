/** @jsxImportSource @emotion/react */
import React from "react";
import { Button, Typography } from "antd";
import { sizeOfInput } from "../../styles/sizes";

const { Text } = Typography;

interface BlueButtonProps {
  disabled: boolean;
  onClick: () => void;
  placeholder: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({ disabled, onClick, placeholder }) => (
  <Button type="primary" disabled={disabled} css={sizeOfInput} onClick={onClick}>
    <Text strong style={{ color: disabled ? "black" : "white" }}>
      {placeholder}
    </Text>
  </Button>
);

export default BlueButton;
