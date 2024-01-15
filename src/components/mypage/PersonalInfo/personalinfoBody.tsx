/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
interface PersonalInformationProbs {
  nickname: string;
  email: string;
  departmentId: number;
}
const PersonalInformationBody: React.FC<PersonalInformationProbs> = ({ nickname, email, departmentId }) => {
  return (
    <div>
      <div css={ProfileSection}>
        <div css={UserInfoWrapper}>
          <h2>{nickname}</h2>
          <p>
            <span css={TextLabel}>닉네임:</span> {nickname}
          </p>
          <p>
            <span css={TextLabel}>이메일:</span> {email}
          </p>
          <p>
            <span css={TextLabel}>학과:</span> {departmentId}
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
