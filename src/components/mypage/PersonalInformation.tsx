/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PersonalImage from "./PersonalInfo/personalImage";
import PersonalInformationBody from "./PersonalInfo/personalinfoBody";
import { UserInfo } from "../../models/user";
interface PersonalInformationProbs {
  userInfo: UserInfo;
}
const PersonalInformation: React.FC<PersonalInformationProbs> = ({ userInfo }) => {
  return (
    <div css={infoContainerStyle}>
      <PersonalImage imageURL={userInfo.image.url} />

      <PersonalInformationBody
        nickname={userInfo.nickname}
        email={userInfo.email}
        departmentId={userInfo.departmentId}
      />
    </div>
  );
};
export default PersonalInformation;

const infoContainerStyle = css`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start; // Aligns items to the start of the flex container
  gap: 20px; // Adjusts the space between the two components
  // Add additional styling as needed
`;
