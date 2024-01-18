/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PersonalImage from "./PersonalInfo/personalImage";
import PersonalInformationBody from "./PersonalInfo/personalinfoBody";
import { UserInfo } from "../../models/user";
interface PersonalInformationProbs {
  userInfo: UserInfo;
}
const PersonalInformation: React.FC<PersonalInformationProbs> = ({ userInfo }) => {
  const noImageUrl = "noimage.png";

  return (
    <div css={infoContainerStyle}>
      <PersonalImage imageURL={(userInfo.image && userInfo.image.url) ?? noImageUrl} />
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
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center; // Center items horizontally
  margin: auto;
  padding: auto;
  gap: 20px; // Adjusts the space between the two components
  // Add additional styling as needed
`;
