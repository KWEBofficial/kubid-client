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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: any) => {
    setSearch(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePressEnter = (e: any) => {
    navigate(
      `/products?search=${e.target.value}&sort=recent&page=1&pageSize=${pageSize}${
        departmentId && departmentId > 0 ? `&departmentId=${departmentId}` : ""
      }`,
    );
  };

  useEffect(() => {
    inputRef.current!.focus({
      cursor: "end",
    });
  }, []);

  return (
    <>
      <Space.Compact css={SpaceStyle}>
        <Input
          placeholder="상품을 검색해 보세요"
          defaultValue={defaultValue}
          allowClear
          css={SearchInputStyle}
          onChange={handleInputChange}
          onPressEnter={handlePressEnter}
          ref={inputRef}
        />
        <Button
          type="primary"
          icon={<SearchOutlined css={SearchIconStyle} />}
          css={SearchButtonStyle}
          href={`/products?search=${search}&sort=recent${
            departmentId && departmentId > 0 ? `&departmentId=${departmentId}` : ""
          }&page=1&pageSize=${defaultPageSize}`}
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
