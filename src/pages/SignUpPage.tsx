import HigherLayoutComponent from "../components/common/CustomLayout";
import { SignUpTag } from "../components/signin/SignUpLayout";
import { Link } from "react-router-dom";

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
      <h2 style={{ margin: 24, textAlign: "center" }}>회원가입</h2>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {/* Adjust the width and maxWidth values based on your design */}
        <SignUpTag />
      </div>
      <Link to="/sign-in">이미 계정이 있으신가요?</Link>
      {/* Add other content for the SignUpPage as needed */}
    </div>
  );
};

const SignUpPage = HigherLayoutComponent(SignUp);

export default SignUpPage;
