/** @jsxImportSource @emotion/react */
import React from "react";
import { Button, Typography } from "antd";
import { css } from "@emotion/react";
import { sizeOfInput } from "../../styles/sizes";

const { Text } = Typography;

interface GrayButtonProps {
  onClick: () => void;
  placeholder: string;
}

const GrayButton: React.FC<GrayButtonProps> = ({ onClick, placeholder }) => (
  <Button type="primary" css={grayButtonStyle} onClick={onClick}>
    <Text strong>{placeholder}</Text>
  </Button>
);

export default GrayButton;

const grayButtonStyle = css`
  ${sizeOfInput}
  background-color: #d9d9d9;
`;
