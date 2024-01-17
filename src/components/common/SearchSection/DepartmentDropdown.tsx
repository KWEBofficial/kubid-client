import { Select, ConfigProvider } from "antd";
import { getDepartments } from "../../../api/department";
import { useEffect, useState } from "react";
import { DepartmentDropdownInfo, DepartmentResDTO } from "../../../models/department";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const DepartmentDropdown: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentDropdownInfo[]>(dummyDepartments);

  useEffect(() => {
    const fetchDepartments = async () => {
      const rawDepartments: DepartmentResDTO[] = await getDepartments();
      const fetchedDepartments = rawDepartments.map((rawDepartment) => {
        return {
          value: rawDepartment.id,
          label: rawDepartment.departmentName,
        };
      });
      setDepartments(() => fetchedDepartments);
    };

    fetchDepartments();
  }, []);

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
      <Select
        defaultValue="학과 선택"
        dropdownStyle={{ padding: 10 }}
        style={{
          width: "100%",
          height: "60px",
          textAlign: "center",
        }}
        onChange={handleChange}
        options={departments}
      />
    </ConfigProvider>
  );
};

export default DepartmentDropdown;

const dummyDepartments: DepartmentDropdownInfo[] = [];
