/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Progress } from "antd";
import { colors } from "../../../../styles/colors";
import { ProductThumbnailInfo } from "../../../../models/product";

interface ItemButtonProps {
  product: ProductThumbnailInfo;
}

const ItemButton: React.FC<ItemButtonProps> = ({ product }) => {
  const { productName, departmentName, lowerBound, currentHighestPrice, upperBound, imageId } = product;
  const progressPercent = ((currentHighestPrice - lowerBound) / (upperBound - lowerBound)) * 100;

  return (
    <Button css={ItemButtonStyle}>
      <div css={ImageSectionStyle}>
        <img src="color.png" alt="Image" css={ImageStyle} />
      </div>
      <div css={TextSectionStyle}>
        <h3 css={TitleStyle}>{productName}</h3>
        <p css={DepartmentStyle}>{departmentName}</p>
        <p css={PriceStyle}>
          <span css={CurrentHighestPriceStyle}>{currentHighestPrice}</span>
          <span css={UpperBoundStyle}>{upperBound}</span>
        </p>
      </div>
      <div css={ProgressBarSectionStyle}>
        <Progress
          percent={progressPercent}
          size={[264, 20]}
          status="normal"
          strokeLinecap="square"
          trailColor="#D9D9D9"
          showInfo={false}
        />
      </div>
    </Button>
  );
};

export default ItemButton;

const ItemButtonStyle = css`
  width: 265px;
  height: 290px;
  padding: 0;
  position: relative;
  overflow: hidden;
  border-radius: 7.5%;
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

const DepartmentStyle = css`
  color: ${colors.black};
  text-align: right;
  font-size: 12px;
  margin-bottom: 0;
`;

const PriceStyle = css`
  margin: 0;
`;

const CurrentHighestPriceStyle = css`
  color: ${colors.black};
  font-weight: 700;
  font-size: 32px;
  margin-right: 5px;
`;

const UpperBoundStyle = css`
  color: ${colors.primary};
  font-weight: 700;
  font-size: 24px;
`;

const ProgressBarSectionStyle = css`
  height: 5%;
  margin: 0;
  position: absolute;
  bottom: 8px;
  left: -4px;
`;
