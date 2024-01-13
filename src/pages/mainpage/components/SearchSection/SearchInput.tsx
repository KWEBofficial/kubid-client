/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = () => {
  return (
    <>
      <Space.Compact css={SpaceStyle}>
        <Input placeholder="상품을 검색해 보세요" css={SearchInputStyle} />
        <Button type="primary" icon={<SearchOutlined css={SearchIconStyle} />} css={SearchButtonStyle}></Button>
      </Space.Compact>
    </>
  );
};

const SpaceStyle = css`
  margin-right: 20px;
`;

const SearchInputStyle = css`
  font-size: 20px;
  width: 570px;
  height: 60px;
`;

const SearchButtonStyle = css`
  width: 60px !important;
  height: 60px;
`;

const SearchIconStyle = css`
  font-size: 38px !important;
`;

export default SearchInput;
