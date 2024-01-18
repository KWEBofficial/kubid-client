/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Flex, Progress } from "antd";
import { colors } from "../../../../styles/colors";
import { sm_lower_bound } from "../../../../styles/responsive";
//import { FireTwoTone } from "@ant-design/icons";
import { CurrentUserBuy, CurrentUserSell } from "../../../../models/product";
import { FireTwoTone } from "@ant-design/icons";

interface ItemButtonProps {
  product: CurrentUserBuy | CurrentUserSell;
  showBidderCount?: boolean;
}

const ItemButton: React.FC<ItemButtonProps> = ({ product, showBidderCount }) => {
  const { id, product_name, department_id, current_highest_price, upper_bound, image, bidderCount } = product;
  const altImageUrl: string = "noimage.png";

  return (
    <Button href={`products/${id}`} css={ItemButtonStyle}>
      <div css={ImageSectionStyle}>
        {image && (
          <img
            src={image.url}
            alt={image.url}
            css={ImageStyle}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.src = altImageUrl;
            }}
          />
        )}
      </div>
      <div css={TextSectionStyle}>
        <h3 css={TitleStyle}>{product_name}</h3>
        <Flex vertical>
          {showBidderCount ? (
            <Flex justify="space-between" align="center" css={DeptStyle}>
              <span css={BidderCountStyle}>
                <FireTwoTone twoToneColor="#F00" /> {bidderCount}
              </span>
              <span>{department_id} 학과</span>
            </Flex>
          ) : (
            <Flex justify="right" align="flex-end" css={DeptStyle}>
              <span css={OnlyDeptStyle}>{department_id}</span>
            </Flex>
          )}

          <Flex css={PriceStyle} align="center">
            <span css={CurrentHighestPriceStyle}>{current_highest_price}</span>
            <span css={UpperBoundStyle}>{upper_bound}</span>
          </Flex>
        </Flex>
      </div>
      <Progress
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
