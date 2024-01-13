import HigherLayoutComponent from "../../components/common/CustomLayout";
import { SignUpTag } from "./SignUpLayout";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

const SignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        marginTop: "-100px",
      }}
    >
      <Title level={2}>회원가입</Title>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Adjust the width and maxWidth values based on your design */}
        <SignUpTag />
      </div>
      <Link to="/auth/sign-in">이미 계정이 있으신가요?</Link>
      {/* Add other content for the SignUpPage as needed */}
    </div>
  );
};

const SignUpPage = HigherLayoutComponent(SignUp);

export default SignUpPage;
