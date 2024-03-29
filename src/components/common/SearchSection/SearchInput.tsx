/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Input, Button, Space, InputRef } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchInputProps {
  departmentId?: number;
  defaultValue?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ departmentId, defaultValue }) => {
  const [search, setSearch] = useState<string>(defaultValue || "");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>(departmentId);

  const params = new URLSearchParams(window.location.search);
  const pageSize = Number(params.get("pageSize")) || 4;

  const inputRef = useRef<InputRef>(null);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchStart = useCallback(() => {
    if (search) {
      navigate(
        `/products?search=${search}&sort=recent&page=1&pageSize=${pageSize}${
          departmentId && departmentId > 0 ? `&departmentId=${departmentId}` : ""
        }`,
      );
      inputRef.current!.focus({
        cursor: "end",
      });
    }
  }, [navigate, pageSize, departmentId, search]);

  useEffect(() => {
    if (selectedDepartmentId !== departmentId) {
      setSelectedDepartmentId(departmentId);
      handleSearchStart();
    }
  }, [departmentId, selectedDepartmentId, handleSearchStart]);

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
            handleSearchStart();
          }}
          ref={inputRef}
        />
        <Button
          type="primary"
          icon={<SearchOutlined css={SearchIconStyle} />}
          css={SearchButtonStyle}
          onClick={() => {
            handleSearchStart();
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
