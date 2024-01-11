import HigherLayoutComponent from "../components/common/CustomLayout";
import ItemList from "../components/main_page/ItemList";
import SearchSection from "../components/main_page/SearchSection";
import { ProductThumbnailInfo } from "../models/product";

const Main = () => {
  const dummyProducts: ProductThumbnailInfo[] = [
    {
      productName: "Product 1",
      departmentName: "Department A",
      lowerBound: 140,
      currentHighestPrice: 150,
      upperBound: 200,
      imageId: 1,
    },
    {
      productName: "Product 2",
      departmentName: "Department B",
      lowerBound: 80,
      currentHighestPrice: 120,
      upperBound: 150,
      imageId: 2,
    },
    {
      productName: "Product 3",
      departmentName: "Department C",
      lowerBound: 120,
      currentHighestPrice: 210,
      upperBound: 220,
      imageId: 3,
    },
  ];

  return (
    <div style={{ width: "900px", margin: "auto" }}>
      <SearchSection />
      <ItemList title="최근에 올라온 거예요" moreUrl="" products={dummyProducts} />
    </div>
  );
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;
