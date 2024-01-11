import { Input, Button, Space, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              onlyIconSize: "38px",
            },
          },
        }}
      >
        <Space.Compact style={{ marginRight: 20 }}>
          <Input placeholder="상품을 검색해 보세요" style={{ fontSize: "20px", width: "570px", height: "60px" }} />
          <Button type="primary" icon={<SearchOutlined />} style={{ width: "60px", height: "60px" }}></Button>
        </Space.Compact>
      </ConfigProvider>
    </>
  );
};

export default SearchInput;
