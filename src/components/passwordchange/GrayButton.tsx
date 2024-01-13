import React from "react";
import { Button, Typography } from "antd";

const { Text } = Typography;

interface GrayButtonProps {
  onClick: () => void;
  placeholder: string;
}

const GrayButton: React.FC<GrayButtonProps> = ({ onClick, placeholder }) => (
  <Button
    type="primary"
    style={{
      width: "328px",
      height: "50px",
      marginBottom: "10px",
      backgroundColor: "#D9D9D9",
    }}
    onClick={onClick}
  >
    <Text strong>{placeholder}</Text>
  </Button>
);

export default GrayButton;
