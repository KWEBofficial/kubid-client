/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Flex, Progress } from "antd";
import { colors } from "../../../../styles/colors";
import { CurrentUserBuy, CurrentUserSell, ProductThumbnailInfo } from "../../../../models/product";
import { sm_lower_bound } from "../../../../styles/responsive";
import { FireTwoTone } from "@ant-design/icons";
import React from "react";

interface ItemButtonProps {
  product: ProductThumbnailInfo | CurrentUserBuy | CurrentUserSell;
  showBidderCount?: boolean;
}

const ItemButton: React.FC<ItemButtonProps> = ({ product, showBidderCount }) => {
  const {
    id,
    status,
    productName,
    departmentName,
    lowerBound,
    currentHighestPrice,
    upperBound,
    imageUrl,
    bidderCount,
  } = product;
  const progressPercent = currentHighestPrice
    ? ((currentHighestPrice - lowerBound) / (upperBound - lowerBound)) * 100
    : 0;

  const altImageUrl: string = "/noimage.png";

  return (
    <Button href={`/products/${id}`} css={ItemButtonStyle}>
      <div css={ImageWrapperStyle}>
        <div css={ImageSectionStyle}>
          <img
            src={imageUrl}
            alt={imageUrl}
            css={ImageStyle}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = altImageUrl;
            }}
          />
        </div>
        {status === "complete" && <div className="overlay">경매 완료</div>}
      </div>
      <div css={TextSectionStyle}>
        <h3 css={TitleStyle}>{productName}</h3>
        <Flex vertical>
          {showBidderCount ? (
            <Flex justify="space-between" align="center" css={DeptStyle}>
              <span css={BidderCountStyle}>
                <FireTwoTone twoToneColor="#F00" /> {bidderCount}
              </span>
              <span>{departmentName}</span>
            </Flex>
          ) : (
            <Flex justify="right" align="flex-end" css={DeptStyle}>
              <span css={OnlyDeptStyle}>{departmentName}</span>
            </Flex>
          )}

          <Flex css={PriceStyle} align="center">
            <span css={CurrentHighestPriceStyle}>{currentHighestPrice || lowerBound}</span>
            <span css={UpperBoundStyle}>{upperBound}</span>
          </Flex>
        </Flex>
      </div>
      <Progress
        percent={progressPercent}
        size={["", 20]}
        status="normal"
        strokeLinecap="square"
        trailColor="#D9D9D9"
        showInfo={false}
        css={ProgressBarSectionStyle}
      />
    </Button>
  );
};

export default ItemButton;

const ItemButtonStyle = css`
  width: 100%;
  height: 280px;
  padding: 0;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 40px;
  transition: all 0.3s ease;

  @media (max-width: ${sm_lower_bound}px) {
    width: 80%;
  }

  &:hover {
    transform: scale(1.1); /* Zoom in by 10% on hover */
  }
`;

const ImageSectionStyle = css`
  position: absolute;
  height: 100%;
  width: 100%;
  margin: 0px;
  background-color: ${colors.imageBg};
`;

const ImageWrapperStyle = css`
  position: relative;
  width: 100%;
  height: 50%;

  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 20px;
    font-weight: bold;
    color: #ffffff;

    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: scale-down;
`;

const TextSectionStyle = css`
  height: 50%;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
`;

const TitleStyle = css`
  color: ${colors.black};
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 0;
  max-width: 265px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeptStyle = css`
  color: ${colors.black};
  text-align: right;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 0;
`;

const PriceStyle = css`
  margin: 0;
  margin-top: -5px;
`;

const CurrentHighestPriceStyle = css`
  color: ${colors.black};
  font-weight: 700;
  font-size: 24px;
  margin-right: 6px;
`;

const UpperBoundStyle = css`
  color: ${colors.primary};
  font-weight: 700;
  font-size: 16px;
  margin-top: 5px;
`;

const ProgressBarSectionStyle = css`
  margin: 0;
  position: absolute;
  bottom: 0px;
  left: 0px;
`;

const BidderCountStyle = css`
  font-size: 18px;
  font-weight: bold;
  color: red;
`;

const OnlyDeptStyle = css`
  margin-bottom: 9px;
`;
