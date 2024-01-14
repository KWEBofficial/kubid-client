import styled from "@emotion/styled";

export const FormContainer = styled.div`
  max-width: 700px;
  margin: auto;
  line-height: 2;
  
  label {
    margin-top: 10px;
    font-size: 20px; // 글자 크기 조정
  }

  label, input {
    display: block; // 블록 레벨 요소로 만들어 줄바꿈 처리
    margin-top: 5px; // 간격 조정
  }

  input {
    margin-bottom: 5px; // 입력 필드 아래에 간격 추가
  }

`;
