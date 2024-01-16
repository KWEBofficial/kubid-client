import { Select, ConfigProvider, Tooltip } from "antd";
import { getDepartments } from "../../../api/department";
import { useEffect, useState } from "react";
import { DepartmentDropdownInfo, DepartmentResDTO } from "../../../models/department";

const DepartmentDropdown: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentDropdownInfo[]>(dummyDepartments);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setSelectedValue(value);
  };

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
        placement="top"
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
  );
};

export default DepartmentDropdown;

const dummyDepartments: DepartmentDropdownInfo[] = [];
