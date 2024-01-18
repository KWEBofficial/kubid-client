/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
//import { Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface MyBoxListProps {
  nickName: string;
  password: string;
  buyCount: string;
  sellCount: string;
}

const MyBoxList: React.FC<MyBoxListProps> = ({ nickName, password, buyCount, sellCount }) => {
  return (
    <div css={CardStyle}>
      <div css={ProfileSection}>
        <div css={AvatarWrapper}>
          <UserOutlined css={UserIconStyle} />
        </div>
        <div css={UserInfoWrapper}>
          <h2>{nickName}</h2>
          <p>
            <span css={TextLabel}>비밀번호:</span> {password}
          </p>
          <p>
            <span css={TextLabel}>판매수:</span> {sellCount}
          </p>
          <p>
            <span css={TextLabel}>구매수:</span> {buyCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBoxList;

const CardStyle = css`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileSection = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AvatarWrapper = css`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const UserInfoWrapper = css`
  flex-grow: 1;
`;

const TextLabel = css`
  font-weight: bold;
  margin-right: 10px;
`;

const UserIconStyle = css`
  font-size: 40px;
`;
