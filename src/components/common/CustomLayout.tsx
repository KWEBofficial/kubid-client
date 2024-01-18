/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layout, Typography, Avatar, FloatButton } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { colors } from "../../styles/colors";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import LinksInNav from "./LinksInNav";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const HigherLayoutComponent = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <Layout>
      <StyledHeader>
        <LogoSection to="/">
          <Avatar src="/logo.svg" alt="logo" />
          <Text strong> KUBID</Text>
        </LogoSection>
        <LinksInNav />
      </StyledHeader>
      <StyledContent>
        <WrappedComponent {...props} />
      </StyledContent>
    </Layout>
  );
};

export default HigherLayoutComponent;

const LogoSection = styled(Link)`
  gap: 1rem;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;

  background-color: ${colors.white};

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    gap: 1rem;

    a {
      color: ${colors.black};
    }
  }

  border-bottom: 1px solid ${colors.gray.default};
`;

const StyledContent = styled(Content)`
  > div {
    width: 800px;
    margin: 0 auto;
  }
`;
