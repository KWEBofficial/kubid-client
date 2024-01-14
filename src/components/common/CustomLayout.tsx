/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Layout, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { colors } from "../../styles/colors";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import LinksInNav from "./LinksInNav";

const { Title } = Typography;

const HigherLayoutComponent = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => (
    <Layout>
      <StyledHeader>
        <Link to="/">
          <Title level={5}>Logo Position</Title>
        </Link>
        <LinksInNav />
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
