import MypageLayoutComponent from "../components/mypage/MyPageLayout";
import ItemList from "../components/mypage/ItemList";
import MyBox from "../components/mypage/MyBox";
//import SearchSection from "../components/main_page/SearchSection";
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
    <div>
      <div style={{ width: "900px", margin: "auto" }}>
        <MyBox nickName="Rino Kang" password="" buyCount="3" sellCount="10" />
      </div>
      <div style={{ width: "900px", margin: "auto" }}>
        <ItemList
          title="판매중인 상품"
          moreUrl="/current/sell"
          products={dummyProducts}
          moreTitle="판매중인 상품 더보기"
        />
      </div>
      <div style={{ width: "900px", margin: "auto" }}>
        <ItemList
          title="구매중인 상품"
          moreUrl="/current/buy"
          products={dummyProducts}
          moreTitle="구매중인 상품 더보기"
        />
      </div>
    </div>
  );
};

const MyPage = MypageLayoutComponent(Main);

export default MyPage;
