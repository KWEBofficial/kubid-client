import { Select, Tooltip } from "antd";
import { getDepartments } from "../../../api/department";
import { useEffect, useState } from "react";
import { DepartmentDropdownInfo, DepartmentResDTO } from "../../../models/department";

interface DepartmentDropdownProps {
  selectedValue?: number | null;
  changeSelectedValue: (value: number | null) => void;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({ selectedValue, changeSelectedValue }) => {
  const [departments, setDepartments] = useState<DepartmentDropdownInfo[]>([]);

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
        label: "학과무관",
      };

      setDepartments(() => [noDepartment, ...departments]);
    });
  }, []);

  return (
    <Tooltip
      title="원하는 학과의 상품만 찾아 보세요!"
      trigger="hover"
      overlayInnerStyle={{ fontSize: "14px" }}
      placement="top"
    >
      <Select
        value={selectedValue}
        onChange={changeSelectedValue}
        options={departments}
        placeholder={"학과를 선택해주세요"}
        allowClear
        style={{ width: "100%", height: "50px", fontSize: "20px" }}
      />
    </Tooltip>
  );
};

export default DepartmentDropdown;
