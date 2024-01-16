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
          // NOTE: ts error가 뜨지만 잘 작동함. 똑같은 값이라도 그냥 number를 주는 거랑 px를 붙여서 주는 것이 시각적으로 다른 결과를 가져옴.
          fontSize: 18,
          fontSizeIcon: 12,
        },
        components: {
          Select: {
            optionHeight: 40,
            optionPadding: 5,
          },
        },
      }}
    >
      <Tooltip title="원하는 학과의 상품만 찾아 보세요!" trigger="hover" overlayInnerStyle={{ fontSize: "14px" }}>
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
