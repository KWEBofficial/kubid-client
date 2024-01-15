/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Flex, Progress, Image } from "antd";
import { colors } from "../../../../styles/colors";
import { ProductThumbnailInfo } from "../../../../models/product";
import { sm_lower_bound } from "../../../../styles/responsive";
import { FireTwoTone } from "@ant-design/icons";

interface ItemButtonProps {
  product: ProductThumbnailInfo;
  showBidderCount?: boolean;
}

const ItemButton: React.FC<ItemButtonProps> = ({ product, showBidderCount }) => {
  const { id, productName, departmentName, lowerBound, currentHighestPrice, upperBound, imageUrl, bidderCount } =
    product;
  const progressPercent = ((currentHighestPrice - lowerBound) / (upperBound - lowerBound)) * 100;
  const altImageUrl: string = "noimage.png";

  return (
    <Button href={`products/${id}`} css={ItemButtonStyle}>
      <div css={ImageSectionStyle}>
        <img
          src={imageUrl}
          alt={imageUrl}
          css={ImageStyle}
          onError={(e) => {
            e.target.src = altImageUrl;
          }}
        />
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
  border-radius: 7.5%;
  margin-bottom: 40px;

  @media (max-width: ${sm_lower_bound}px) {
    width: 80%;
  }
`;

const ImageSectionStyle = css`
  height: 50%;
  margin: 0;
`;

const ImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 32px;
  margin-right: 6px;
`;

const UpperBoundStyle = css`
  color: ${colors.primary};
  font-weight: 700;
  font-size: 24px;
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
