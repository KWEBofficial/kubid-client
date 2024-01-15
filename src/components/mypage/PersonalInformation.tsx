/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PersonalImage from "./PersonalInfo/personalImage";
import PersonalInformationBody from "./PersonalInfo/personalinfoBody";
interface PersonalInformationProbs {
  nickname: string;
  password: string;
  email: string;
  department: string;
  sellCount: number;
  buyCount: number;
  imageId: number;
}
const PersonalInformation: React.FC<PersonalInformationProbs> = ({
  nickname,
  password,
  email,
  department,
  sellCount,
  buyCount,
  imageId,
}) => {
  return (
    <div css={infoContainerStyle}>
      <PersonalImage imageId={imageId} />
      <PersonalInformationBody
        nickname={nickname}
        password={password}
        email={email}
        buyCount={buyCount}
        sellCount={sellCount}
        department={department}
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
