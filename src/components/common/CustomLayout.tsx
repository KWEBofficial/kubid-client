/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { colors } from "../../styles/colors";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const HigherLayoutComponent = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <Layout>
      <StyledHeader>
        <div>Logo Position</div>
        <nav>
          <Link to="/sign-in">로그인</Link>
          <Link to="/sign-up">회원가입</Link>
        </nav>
      </StyledHeader>
      <StyledContent>
        <WrappedComponent {...props} />
      </StyledContent>
    </Layout>
  );
};

export default HigherLayoutComponent;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;

  background-color: ${colors.primary};

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    a {
      color: ${colors.black};
    }
  }
`;

const StyledContent = styled(Content)`
  > div {
    width: 800px;
    margin: 0 auto;
  }
`;
