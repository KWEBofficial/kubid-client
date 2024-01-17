/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchInput from "./SearchSection/SearchInput";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import DepartmentDropdown from "./SearchSection/DepartmentDropdown";

const SearchSection = () => {
  const [selectedValue, setSelectedValue] = useState<number>(0);

  return (
    <div css={SearchSectionStyle}>
      <Row gutter={16}>
        <Col xs={24} md={16} lg={18}>
          <SearchInput departmentId={selectedDepartmentId ?? undefined} defaultValue={defaultValue} />
        </Col>
        <Col xs={24} md={8} lg={6}>
          <DepartmentDropdown />
        </Col>
      </Row>
    </div>
  );
};

const SearchSectionStyle = css`
  margin-top: 80px;
  margin-bottom: 50px;
`;

export default SearchSection;
