/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Input, Button, Space, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
  departmentId?: number;
  defaultValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ departmentId, defaultValue }) => {
  const [search, setSearch] = useState<string>(defaultValue || "");
  const defaultPageSize = 4;

  const params = new URLSearchParams(window.location.search);
  const pageSize = Number(params.get("pageSize")) || 4;

  const inputRef = useRef<InputRef>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchStart = (search: string) => {
    navigate(
      `/products?search=${search}&sort=recent&page=1&pageSize=${pageSize}${
        departmentId && departmentId > 0 ? `&departmentId=${departmentId}` : ""
      }`,
    );
    inputRef.current!.focus({
      cursor: "end",
    });
  };

  return (
    <>
      <Space.Compact css={SpaceStyle}>
        <Input
          placeholder="상품을 검색해 보세요"
          defaultValue={defaultValue}
          allowClear
          css={SearchInputStyle}
          onChange={handleInputChange}
          onPressEnter={() => {
            handleSearchStart(search);
          }}
          ref={inputRef}
        />
        <Button
          type="primary"
          icon={<SearchOutlined css={SearchIconStyle} />}
          css={SearchButtonStyle}
          onClick={() => {
            handleSearchStart(search);
          }}
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
