/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { AxiosError } from "axios";
import { getRecentProducts } from "../../api/product";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import ItemList from "./components/ItemList";
import SearchSection from "./components/SearchSection";
import { ProductThumbnailInfo } from "../../models/product";
import { useEffect, useState } from "react";
import { message, Flex } from "antd";
import { COMMON_MESSAGE } from "../../contants/message";
import { getResponsiveValueByWindowWidth, sm_lower_bound, xl_lower_bound } from "../../styles/responsive";
import { DEPARTMENTS } from "../../data/department";

const Main = () => {
  const [recentProducts, setRecentProducts] = useState<ProductThumbnailInfo[]>(dummyProducts);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [maxItemCount, setMaxItemCount] = useState<number>(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMaxItemCount(
      getResponsiveValueByWindowWidth(windowWidth, {
        xl: 4,
        md: 3,
        sm: 2,
        xs: 1,
      }),
    );
  }, [windowWidth]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const rawProducts = await getRecentProducts();
        const products: ProductThumbnailInfo[] = rawProducts.map((rawProduct: any) => {
          const { id, productName, departmentId, currentHighestPrice, upperBound, lowerBound } = rawProduct;
          const product: ProductThumbnailInfo = {
            id,
            productName,
            departmentName: DEPARTMENTS[departmentId].label,
            lowerBound,
            currentHighestPrice,
            upperBound,
            imageUrl: "color.png", // TODO: GET /products 변경 필요
          };
          return product;
        });
        if (products) {
          setRecentProducts(() => [...products]);
        }
      } catch (error) {
        const [messageApi] = message.useMessage();
        if (error instanceof AxiosError) {
          messageApi.open({
            type: "error",
            content: error?.response?.data.message || COMMON_MESSAGE.SERVER_ERROR,
          });
          return;
        } else {
          messageApi.open({
            type: "error",
            content: COMMON_MESSAGE.UNKNOWN_ERROR,
          });
        }
      }
    };
    fetchRecentProducts();
  }, []);

  return (
    <Flex vertical css={SpaceStyle}>
      <SearchSection />
      <ItemList title="지금 핫한 🔥" moreUrl="" products={recentProducts} maxItemCount={maxItemCount} />
      <ItemList title="최근에 올라온" moreUrl="" products={recentProducts} maxItemCount={maxItemCount} />
      <ItemList title="컴퓨터학과에서 많이 찾는" moreUrl="" products={recentProducts} maxItemCount={maxItemCount} />
    </Flex>
  );
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;

const SpaceStyle = css`
  display: flex;
  width: 1100px !important;

  @media (max-width: ${xl_lower_bound}px) {
    width: 90% !important;
  }

  @media (max-width: ${sm_lower_bound}px) {
    width: 85% !important;
  }
`;

const dummyProducts: ProductThumbnailInfo[] = [];
