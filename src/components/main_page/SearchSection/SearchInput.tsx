import { Input } from "antd";

const { Search } = Input;

const SearchInput = () => {
  return <Search size="large" placeholder="상품을 검색해 보세요" style={{ flex: 2, marginRight: "8px" }} />;
};

export default SearchInput;
