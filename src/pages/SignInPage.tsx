import HigherLayoutComponent from "../components/common/CustomLayout";
import { SignInTag } from "../components/signin/SignInLayout";
import { Link } from "react-router-dom";
import { Typography } from "antd";

const { Title } = Typography;

const SignIn = () => {
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
      <Title level={2}>로그인</Title>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Adjust the width and maxWidth values based on your design */}
        <SignInTag />
      </div>
      <Link to="/auth/sign-up">아직 계정이 없으신가요?</Link>
      {/* Add other content for the SignUpPage as needed */}
    </div>
  );
};

const SignInPage = HigherLayoutComponent(SignIn);

export default SignInPage;
