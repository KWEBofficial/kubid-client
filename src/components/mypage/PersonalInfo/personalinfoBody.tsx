/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDepartments } from "../../../api/department/index";
import { useEffect, useState } from "react";
interface PersonalInformationProbs {
  nickname: string;
  email: string;
  departmentId: number;
}

interface Department {
  id: number;
  departmentName: string;
}
const PersonalInformationBody: React.FC<PersonalInformationProbs> = ({ nickname, email, departmentId }) => {
  const [departmentName, setDepartmentName] = useState("");

  useEffect(() => {
    getDepartments()
      .then((departments: Department[]) => {
        // departments 배열에서 departmentId와 일치하는 학과명 찾기
        const department = departments.find((dept) => dept.id === departmentId);
        if (department) {
          setDepartmentName(department.departmentName);
        }
      })
      .catch((error) => {
        console.error("학과 정보를 불러오는 데 실패했습니다.", error);
      });
  }, [departmentId]); // departmentId가 변경될 때마다 API 호출

  return (
    <div>
      <div css={ProfileSection}>
        <div css={UserInfoWrapper}>
          <h2>{nickname}</h2>
          <p>
            <span css={TextLabel}>이메일:</span> {email}
          </p>
          <p>
            <span css={TextLabel}>학과:</span> {departmentName}
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
