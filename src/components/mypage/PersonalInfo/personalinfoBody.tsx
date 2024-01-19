/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Button, Modal } from "antd";
import { getDepartments } from "../../../api/department/index";
import { patchUserDetails } from "../../../api/user/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Input } from "antd";
import { NicknameChangeInfo } from "../../../models/user";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNickname, setNewNickname] = useState(""); // Step 1: State for the new nickname

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const nicknameChangeInfo: NicknameChangeInfo = {
      nickname: newNickname,
    };
    await patchUserDetails(nicknameChangeInfo);
    window.location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const navigate = useNavigate();

  const handlePasswordChange = () => {
    navigate("/users/current-user/password");
    window.location.reload();
  };
  return (
    <div>
      <div css={ProfileSection}>
        <div css={UserInfoWrapper}>
          <p css={NicknameContainer}>
            <h1 css={Nickname}>{nickname}</h1>
            <Button type="primary" ghost onClick={showModal}>
              변경
            </Button>
          </p>

          <Modal title="변경할 닉네임을 입력하세요" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Flex vertical gap={12}>
              <Input placeholder="새로운 닉네임" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
            </Flex>
          </Modal>
          <p css={InfoParagraph}>
            <span css={TextLabel}>이메일:</span> {email}
          </p>
          <p css={InfoParagraph}>
            <span css={TextLabel}>학과:</span> {departmentName}
          </p>
          <p css={InfoParagraph}>
            <Button type="text" onClick={handlePasswordChange} style={{ padding: 0 }}>
              비밀번호 변경하기
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PersonalInformationBody;
const InfoParagraph = css`
  padding: 3px; /* Adjust the margin-bottom value as needed */
`;
const NicknameContainer = css`
  display: flex;
  align-items: center;
`;

const Nickname = css`
  margin-right: 10px;
`;
const ProfileSection = css`
  display: flex;
  align-items: right;
  margin-bottom: 20px;
`;

const UserInfoWrapper = css`
  flex-grow: 1;
`;

const TextLabel = css`
  font-weight: bold;
  margin-right: 10px;
`;
