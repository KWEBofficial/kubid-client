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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  fontSize: 20px;
  height: 50px;
`;

const SearchButtonStyle = css`
  width: 50px !important;
  height: 50px;
`;

const SearchIconStyle = css`
  font-size: 30px !important;
  margin-top: 5px;
`;

export default SearchInput;
