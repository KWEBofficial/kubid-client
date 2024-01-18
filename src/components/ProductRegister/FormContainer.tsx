import styled from "@emotion/styled";

export const FormContainer = styled.div`
  max-width: 700px;
  margin: auto;
  line-height: 2;

  .input-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px; 
  }

  label {
    margin-top: 10px;
    font-size: 16px; // 글자 크기 조정
    font-weight: bold;
  }

  label,
  input {
    display: block; // 블록 레벨 요소로 만들어 줄바꿈 처리
    margin-top: 5px; // 간격 조정
  }

  input {
    margin-bottom: 5px; // 입력 필드 아래에 간격 추가
  }

  .desc {
    border: none; /* 경계선 제거 */
    width: 100%; /* 너비를 고정하거나 부모 요소에 맞춤 */
    height: 150px; /* 높이 설정 */
    padding: 10px; /* 내부 여백 설정 */
    resize: none; /* 크기 조절 기능 비활성화 */
  }
`;
