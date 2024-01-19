/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import { getProductDetail } from "../../api/product";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Tag } from "antd";
import ImageGet from "../../components/common/ImageGet";
import InitialButtons from "./InitialButtons";
import BuyerButtons from "./BuyerButtons";
import SellerButtons from "./SellerButtons";
import {
  CalendarTwoTone,
  CrownTwoTone,
  EnvironmentTwoTone,
  FireTwoTone,
  FlagTwoTone,
  TagsTwoTone,
} from "@ant-design/icons";
import DualProgress from "./DualProgress";

const { Title, Text } = Typography;

const ProductInfo: React.FC = () => {
  const { productId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [productDetail, setProductDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        try {
          const data = await getProductDetail(productId);
          setProductDetail(data);
        } catch (error) {
          console.error("Error fetching product detail:", error);
        }
      }
    };

    fetchData();
  }, [productId]);

  if (!productId || productDetail === null) {
    return null;
  }

  const parseJwt = (token: string | null) => {
    if (token === null) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload);
  };

  const token = localStorage.getItem("_auth");
  const decodedToken = parseJwt(token);
  const userId = decodedToken === null ? null : decodedToken.id;

  const {
    productName,
    lowerBound,
    upperBound,
    currentHighestPrice,
    image: { url: imageUrl },
    description,
    tags,
    tradeLocation,
    tradeDate,
    department,
    biddings,
    seller,
  } = productDetail;

  const bidders = new Set(biddings.map((bidding: { user_id: number }) => bidding.user_id));
  const isSeller = userId === seller.id;
  const isBuyer = bidders.has(userId);
  // 현재 입찰자 기준으로 가장 높은 bidding을 구하기
  const highestBidding = isBuyer
    ? biddings.reduce(
        (maxBidding: number, bidding: { user_id: number; bidding_price: number }) =>
          bidding.user_id === userId && bidding.bidding_price > maxBidding ? bidding.bidding_price : maxBidding,
        0,
      )
    : null;
  const progressPercentBuyer = ((highestBidding - lowerBound) / (upperBound - lowerBound)) * 100;
  const progressPercentTotal = ((currentHighestPrice - lowerBound) / (upperBound - lowerBound)) * 100;

  return (
    <div>
      <CenteredCol style={{ justifyContent: "center" }}>
        <ImageGet src={imageUrl} />
      </CenteredCol>
      <StyledRow>
        <CenteredCol span={21}>
          <Title level={4} style={{ margin: 0 }}>
            {productName}
          </Title>
          <TextDesc>
            &nbsp;&nbsp;
            <FireTwoTone twoToneColor="#F00" /> {bidders.size}
          </TextDesc>
        </CenteredCol>
        <CenteredCol span={3}>
          <Text>&nbsp;&nbsp;{department}</Text>
        </CenteredCol>
      </StyledRow>
      {bidders.size === 0 ? (
        <StyledRow>
          <CenteredCol span={12}>
            <TextDesc>하한가 </TextDesc>
            <Text style={{ fontSize: "36px", fontWeight: "bolder", color: colors.secondary }}>{lowerBound}</Text>
          </CenteredCol>
          <CenteredCol span={12}>
            <FlagTwoTone twoToneColor={colors.gray.dark} />
            <TextDesc>&nbsp;상한가 </TextDesc>
            <Text style={{ fontSize: "36px", fontWeight: "bolder", color: colors.blue }}>{upperBound}</Text>
          </CenteredCol>
        </StyledRow>
      ) : (
        <StyledRow>
          <CenteredCol span={12}>
            <CrownTwoTone twoToneColor={colors.gray.dark} />
            <TextDesc>&nbsp;현재 최고가 </TextDesc>
            <Text style={{ fontSize: "36px", fontWeight: "bolder", color: colors.secondary }}>
              {currentHighestPrice}
            </Text>
          </CenteredCol>
          <CenteredCol span={12}>
            <FlagTwoTone twoToneColor={colors.gray.dark} />
            <TextDesc>&nbsp;상한가 </TextDesc>
            <Text style={{ fontSize: "36px", fontWeight: "bolder", color: colors.blue }}>{upperBound}</Text>
          </CenteredCol>
        </StyledRow>
      )}
      <StyledRow>
        <CenteredCol span={3}></CenteredCol>
      </StyledRow>
      <StyledRow>
        <EnvironmentTwoTone twoToneColor={colors.gray.dark} />
        <CenteredCol span={3}>
          <TextDesc>&nbsp;거래장소 </TextDesc>
        </CenteredCol>
        <CenteredCol span={14}>
          <TextDesc>{tradeLocation}</TextDesc>
        </CenteredCol>
      </StyledRow>
      <StyledRow>
        <CalendarTwoTone twoToneColor={colors.gray.dark} />
        <CenteredCol span={3}>
          <TextDesc>&nbsp;거래일시 </TextDesc>
        </CenteredCol>
        <CenteredCol span={14}>
          <TextDesc>{tradeDate}</TextDesc>
        </CenteredCol>
      </StyledRow>
      <StyledRow>
        <TagsTwoTone twoToneColor={colors.gray.dark} />
        <CenteredCol span={3}>
          <TextDesc>&nbsp;태그 </TextDesc>
        </CenteredCol>
        <CenteredCol span={14}>
          {tags.map((tag: any, index: number) => (
            <Tag key={index}>
              #{tag.tag.trim()}
              {index < tags.length - 1 && " "}
            </Tag>
          ))}
        </CenteredCol>
      </StyledRow>
      <StyledRow style={{ textAlign: "left", marginTop: "16px" }}>
        <Text>{description}</Text>
      </StyledRow>
      {isSeller ? (
        <div>
          <div style={{ marginLeft: `${progressPercentTotal - 3}%`, textAlign: "left" }}>
            <TextDesc>최고입찰자</TextDesc>
          </div>
          <div style={{ height: "50px", position: "relative" }}>
            <DualProgress percent1={0} percent2={progressPercentTotal} />
          </div>
          <SellerButtons />
        </div>
      ) : isBuyer ? (
        <div>
          <div style={{ marginLeft: `${progressPercentBuyer - 1}%`, textAlign: "left" }}>
            <TextDesc>나</TextDesc>
          </div>
          <div style={{ height: "50px", position: "relative" }}>
            <DualProgress percent1={progressPercentBuyer} percent2={progressPercentTotal} />
          </div>
          <BuyerButtons values={{ lowerBound, currentHighestPrice, upperBound }} />
        </div>
      ) : (
        <div>
          <div style={{ height: "50px", position: "relative" }}>
            <DualProgress percent1={0} percent2={progressPercentTotal} />
          </div>
          <InitialButtons values={{ lowerBound, currentHighestPrice, upperBound }} />
        </div>
      )}
    </div>
  );
};

export default ProductInfo;

const StyledRow = styled(Row)`
  margin: 10px;
`;

const CenteredCol = styled(Col)`
  display: flex;
  align-items: baseline;
  width: 800px;
`;

const TextDesc = styled(Text)`
  font-weight: bolder;
  margin: 0 10px 0 0;
`;
