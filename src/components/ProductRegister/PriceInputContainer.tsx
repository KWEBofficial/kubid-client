import { useState } from "react";
import styled from "@emotion/styled";

const PriceInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  label {
    flex-basis: 50%;
  }

  input {
    flex: 1;
    margin: 10px;
    padding: 8px;
    border: 1px solid #ccc;
  }

`;

const CurrencyLabel = styled.span`
  width: 30px;
  display: inline-block; // "원"을 인라인 블록으로 만들어 입력 필드와 같은 줄에 표시
`;

// 가격 입력
const PriceInput = () => {
  const [lowerbound, setLowerbound] = useState("");
  const [upperbound, setUpperbound] = useState("");

  return (
    
    <PriceInputContainer>
      <label htmlFor="lowerbound">얼마에 시작하시겠어요?</label>
      <input
        type="text"
        id="lowerbound"
        placeholder="하한가"
        value={lowerbound}
        onChange={(e) => setLowerbound(e.target.value)}
      />
      <CurrencyLabel>원</CurrencyLabel>
      
      <label htmlFor="upperbound">얼마에 바로 낙찰하셨어요?</label>
      <input
        type="text"
        id="upperbound"
        placeholder="상한가"
        value={upperbound}
        onChange={(e) => setUpperbound(e.target.value)}
      />
      <CurrencyLabel>원</CurrencyLabel>
    </PriceInputContainer>
  );
};

export default PriceInput;
