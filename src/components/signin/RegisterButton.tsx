import React from "react";
import { Button } from "antd";
import "../../styles/global.css";

interface RegisterButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ disabled, onClick }) => (
  <Button
    type="primary"
    disabled={disabled}
    style={{ width: "328px", height: "50px", marginBottom: "10px" }}
    onClick={onClick}
  >
    Register
  </Button>
);

export default RegisterButton;
