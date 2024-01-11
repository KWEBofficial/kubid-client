import SearchInput from "./SearchSection/SearchInput";
import DepartmentDropdown from "./SearchSection/DepartmentDropdown";
import { Space } from "antd";

const SearchSection = () => {
  return (
    <div style={{ marginTop: "80px", marginBottom: "100px" }}>
      <Space>
        <SearchInput />
        <DepartmentDropdown />
      </Space>
    </div>
  );
};

export default SearchSection;
