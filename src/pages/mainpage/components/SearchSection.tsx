/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchInput from "./SearchSection/SearchInput";
import DepartmentDropdown from "./SearchSection/DepartmentDropdown";
import { Space } from "antd";

const SearchSection = () => {
  return (
    <div css={SearchSectionStyle}>
      <Space>
        <SearchInput />
        <DepartmentDropdown />
      </Space>
    </div>
  );
};

const SearchSectionStyle = css`
  margin-top: 80px;
  margin-bottom: 50px;
`;

export default SearchSection;
