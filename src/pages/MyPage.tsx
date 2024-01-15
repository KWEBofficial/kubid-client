// settings
/* eslint-disable @typescript-eslint/no-explicit-any */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Flex } from "antd";
import { getUserInfo } from "../api/user";
import { sm_lower_bound, xl_lower_bound } from "../styles/responsive";
import React, { useEffect, useState } from "react";

//components
import MypageLayoutComponent from "../components/common/CustomLayout";
import ItemList from "../components/mypage/ItemList";
import PersonalInformation from "../components/mypage/PersonalInformation";

//import SearchSection from "../components/main_page/SearchSection";
import { ProductThumbnailInfo } from "../models/product";

const Main = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    departmentId: 0,
    imageURL: "",
  });
  useEffect(() => {
    getUserInfo()
      .then((data) => {
        // API에서 받은 데이터를 userInfo 상태에 저장
        setUserInfo({
          nickname: data.nickname,
          email: data.email,
          departmentId: data.departmentId,
          imageURL: data.image.url,
        });
      })
      .catch((error) => {
        console.error("API 호출 중 에러 발생:", error);
        // 에러 처리 로직
      });
  }, []);
  return (
    <Flex vertical css={SpaceStyle}>
      <div css={TitleSection}>마이페이지</div>
      <PersonalInformation userInfo={userInfo} />
      <ItemList title="최근구매중인" moreUrl="" products={dummyProducts} moreTitle="최근구매중인" />
      <ItemList title="경영학과에서 많이 찾는" moreUrl="" products={dummyProducts} moreTitle="최근구매중인" />
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
  padding: auto;
  margin-bottom: 50px;
  font-size: 20px;
`;
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
