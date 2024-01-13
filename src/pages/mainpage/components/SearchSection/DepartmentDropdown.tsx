import { Select, ConfigProvider } from "antd";
import { DEPARTMENTS } from "../../../../data/department";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const DepartmentDropdown: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // NOTE: ts error가 뜨지만 잘 작동함. 똑같은 값이라도 그냥 number를 주는 거랑 px를 붙여서 주는 것이 시각적으로 다른 결과를 가져옴.
          fontSize: "18px",
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
        options={DEPARTMENTS}
      />
    </ConfigProvider>
  );
};

export default DepartmentDropdown;
