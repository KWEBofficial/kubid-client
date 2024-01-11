/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Progress } from "antd";
import { colors } from "../../../../styles/colors";

const ItemButton = () => {
  return (
    <Button css={ItemButtonStyle}>
      <div css={ImageSectionStyle}>
        {/* Image Section */}
        <img src="cat.png" alt="Image" css={ImageStyle} />
      </div>
      <div css={TextSectionStyle}>
        {/* Text Section */}
        <h3 css={TitleStyle}>[급처] 엄청 긴 제목을 쓰면 글이 잘립니다</h3>
        <p css={DepartmentStyle}>컴퓨터학과</p>
        <p css={PriceStyle}>
          <span css={CurrentHighestPriceStyle}>7000</span>
          <span css={UpperBoundStyle}>10000</span>
        </p>
      </div>
      <div css={ProgressBarSectionStyle}>
        {/* Progress Bar Section */}
        <Progress percent={70} size={[265, 20]} status="normal" showInfo={false} />
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
  left: -5px;
`;
