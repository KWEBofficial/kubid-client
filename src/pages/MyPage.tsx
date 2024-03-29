// settings
/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Flex } from "antd";
import { getCurrentUser } from "../api/user";
import { getSellingProduct, getSoldProduct } from "../api/user";
import { getBuyingProduct } from "../api/user";
import { getResponsiveValueByWindowWidth, sm_lower_bound, xl_lower_bound } from "../styles/responsive";
import { useEffect, useState } from "react";
import { DEPARTMENTS } from "../data/department";

//components
import MypageLayoutComponent from "../components/common/CustomLayout";
import ItemList from "../components/common/ItemList";
import PersonalInformation from "../components/mypage/PersonalInformation";

//import SearchSection from "../components/main_page/SearchSection";
import { CurrentUserBuy, CurrentUserSell } from "../models/product";
import { UserInfo } from "../models/user";

const Main = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [buyingProducts, setBuyingProducts] = useState<CurrentUserBuy[]>();
  const [sellingProducts, setSellingProducts] = useState<CurrentUserSell[]>();
  const [soldProducts, setSoldProducts] = useState<CurrentUserSell[]>();
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
    (async () => {
      try {
        const CurrentUser: UserInfo = await getCurrentUser();

        setUserInfo(CurrentUser);
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const rawProducts = await getSellingProduct(1, 5);
        const sellingProducts: CurrentUserSell[] = rawProducts.map((product: any) => {
          const { department_id, image, ...rest } = product;
          return {
            ...rest,
            department_id: department_id,
            image: image,
            imageUrl: image ? image.url : "",
            departmentName: DEPARTMENTS[department_id].label, // Add the department name
          };
        });
        setSellingProducts(sellingProducts ?? []);
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const rawProducts = await getSoldProduct(1, 5);
        const soldProducts: CurrentUserSell[] = rawProducts.map((product: any) => {
          const { department_id, image, ...rest } = product;
          return {
            ...rest,
            department_id: department_id,
            image: image,
            imageUrl: image ? image.url : "",
            departmentName: DEPARTMENTS[department_id].label, // Add the department name
          };
        });
        setSoldProducts(soldProducts ?? []);
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const rawProducts: CurrentUserBuy[] = await getBuyingProduct(1, 5);

        const buyingProducts = rawProducts.map((product) => {
          const { department_id, image, ...rest } = product;
          return {
            ...rest,
            department_id: department_id,
            image: image,
            imageUrl: image ? image.url : "",
            departmentName: DEPARTMENTS[department_id].label, // Add the department name
          };
        });

        setBuyingProducts(buyingProducts ?? []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Flex vertical css={SpaceStyle}>
      <div css={TitleSection}>마이페이지</div>
      {userInfo && <PersonalInformation userInfo={userInfo} />}
      {buyingProducts && (
        <ItemList
          title="구매 중인 상품"
          products={buyingProducts}
          maxItemCount={maxItemCount}
          moreUrl="/mypage/buying"
          moreText="구매 중인 상품 더보기"
          showBidderCount
          showMore
        />
      )}
      {sellingProducts && (
        <ItemList
          title="판매 중인 상품"
          products={sellingProducts}
          maxItemCount={maxItemCount}
          moreUrl="/mypage/selling"
          moreText="판매 중인 상품 더보기"
          showBidderCount
          showMore
        />
      )}
      {soldProducts && (
        <ItemList
          title="판매 완료 상품"
          products={soldProducts}
          maxItemCount={maxItemCount}
          moreUrl="/mypage/sold"
          moreText="판매 완료 상품 더보기"
          showBidderCount
        />
      )}
    </Flex>
  );
};

const MyPage = MypageLayoutComponent(Main);

export default MyPage;

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

const TitleSection = css`
  margin-top: 80px;
  display: flex;
  justify-content: center; // 중앙 정렬
  align-items: center; // 세로축 중앙 정렬
  padding: auto;
  margin-bottom: 50px;
  font-size: 45px; // 텍스트 크기 증가
  font-weight: bold; // 텍스트를 굵게
  width: 100%; // 전체 너비 사용
`;
