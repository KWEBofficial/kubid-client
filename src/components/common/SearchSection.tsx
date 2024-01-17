/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import SearchInput from "./SearchSection/SearchInput";
import { Col, ConfigProvider, Row, Select, Tooltip } from "antd";
import { DepartmentDropdownInfo, DepartmentResDTO } from "../../models/department";
import { useEffect, useState } from "react";
import { getDepartments } from "../../api/department";
import { getResponsiveValueByWindowWidth } from "../../styles/responsive";
import { TooltipPlacement } from "antd/es/tooltip";

const SearchSection = () => {
  const [departments, setDepartments] = useState<DepartmentDropdownInfo[]>(dummyDepartments);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [tooltipPlacement, setTooltipPlacement] = useState<TooltipPlacement>("top");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChange = (value: number) => {
    setSelectedValue(value);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setTooltipPlacement(
      getResponsiveValueByWindowWidth(windowWidth, {
        md: "top",
        xs: "bottom",
      }),
    );
  }, [windowWidth]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const rawDepartments: DepartmentResDTO[] = await getDepartments();
      const fetchedDepartments: DepartmentDropdownInfo[] = rawDepartments.map((rawDepartment) => {
        return {
          value: rawDepartment.id,
          label: rawDepartment.departmentName,
        };
      });
      return fetchedDepartments;
    };

    fetchDepartments().then((departments: DepartmentDropdownInfo[]) => {
      const noDepartment: DepartmentDropdownInfo = {
        value: 0,
        label: "학과 상관 없이",
      };

      setDepartments(() => [noDepartment, ...departments]);
    });
  }, []);

  useEffect(() => {
    if (selectedValue === undefined) setSelectedValue(0);
    console.log(selectedValue);
  }, [selectedValue]);

  return (
    <div css={SearchSectionStyle}>
      <Row gutter={16}>
        <Col xs={24} md={16} lg={18}>
          <SearchInput departmentId={selectedValue} />
        </Col>
        <Col xs={24} md={8} lg={6}>
          <ConfigProvider
            theme={{
              token: {
                fontSize: 18,
                fontSizeIcon: 12,
              },
              components: {
                Select: {
                  optionHeight: 40,
                  optionPadding: 10,
                },
              },
            }}
          >
            <Tooltip
              title="원하는 학과의 상품만 찾아 보세요!"
              trigger="hover"
              overlayInnerStyle={{ fontSize: "14px" }}
              placement={tooltipPlacement}
            >
              <Select
                value={selectedValue}
                dropdownStyle={{ padding: 10 }}
                style={{
                  width: "100%",
                  height: "60px",
                  textAlign: "center",
                }}
                onChange={handleChange}
                options={departments}
                allowClear
              />
            </Tooltip>
          </ConfigProvider>
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

const dummyDepartments: DepartmentDropdownInfo[] = [];
