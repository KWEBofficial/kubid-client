import SearchInput from "./SearchSection/SearchInput";
import DepartmentDropdown from "./SearchSection/DepartmentDropdown";

const SearchSection = () => {
  return (
    <div style={{ marginTop: "80px", marginBottom: "100px" }}>
      <SearchInput />
      <DepartmentDropdown />
    </div>
  );
};

export default SearchSection;