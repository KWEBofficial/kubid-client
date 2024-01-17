/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

interface SearchInputProps {
  departmentId?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ departmentId }) => {
  const [search, setSearch] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Space.Compact css={SpaceStyle}>
        <Input placeholder="상품을 검색해 보세요" allowClear css={SearchInputStyle} onChange={handleInputChange} />
        <Button
          type="primary"
          icon={<SearchOutlined css={SearchIconStyle} />}
          css={SearchButtonStyle}
          href={`/product?search=${search}${departmentId && departmentId > 0 ? `&departmentId=${departmentId}` : ""}`} // TODO: 검색 페이지 url 변동 가능성 있음
        ></Button>
      </Space.Compact>
    </>
  );
};

const SpaceStyle = css`
  margin-right: 20px;
  width: 100%;
`;

const SearchInputStyle = css`
  font-size: 20px;
  height: 60px;
`;

const SearchButtonStyle = css`
  width: 60px !important;
  height: 60px;
`;

const SearchIconStyle = css`
  font-size: 38px !important;
  margin-top: 5px;
`;

export default SearchInput;
