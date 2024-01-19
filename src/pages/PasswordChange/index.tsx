import HigherLayoutComponent from "../../components/common/CustomLayout";
import { Typography } from "antd";
import { PasswordChangeTag } from "./PasswordChangeLayout";

const { Title } = Typography;

const PasswordChange = () => {
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
      <Title level={2}>비밀번호 수정</Title>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <PasswordChangeTag />
      </div>
    </div>
  );
};

const PasswordChangePage = HigherLayoutComponent(PasswordChange);

export default PasswordChangePage;
