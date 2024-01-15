/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
interface PersonalInformationProbs {
  nickname: string;
  password: string;
  email: string;
  department: string;
  sellCount: number;
  buyCount: number;
}
const PersonalInformationBody: React.FC<PersonalInformationProbs> = ({
  nickname,
  password,
  email,
  department,
  sellCount,
  buyCount,
}) => {
  return (
    <div>
      <div css={ProfileSection}>
        <div css={UserInfoWrapper}>
          <h2>{nickname}</h2>
          <p>
            <span css={TextLabel}>닉네임:</span> {nickname}
          </p>
          <p>
            <span css={TextLabel}>비밀번호:</span> {password}
          </p>
          <p>
            <span css={TextLabel}>이메일:</span> {email}
          </p>
          <p>
            <span css={TextLabel}>학과:</span> {department}
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
export default PersonalInformationBody;

const ProfileSection = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserInfoWrapper = css`
  flex-grow: 1;
`;

const TextLabel = css`
  font-weight: bold;
  margin-right: 10px;
`;
