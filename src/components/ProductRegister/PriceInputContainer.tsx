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
  const [lowerBound, setLowerbound] = useState("");
  const [upperBound, setUpperbound] = useState("");

  return (
    <div>
    <PriceInputContainer>
      <label htmlFor="lowerBound">얼마에 시작하시겠어요?</label>
      <input
        type="text"
        id="lowerBound"
        placeholder="하한가"
        value={lowerBound}
        onChange={(e) => setLowerbound(e.target.value)}
      />
      <CurrencyLabel>원</CurrencyLabel>
     
      <label htmlFor="upperBound">얼마에 바로 낙찰하셨어요?</label>
      <input
        type="text"
        id="upperBound"
        placeholder="상한가"
        value={upperBound}
        onChange={(e) => setUpperbound(e.target.value)}
      />
      <CurrencyLabel>원</CurrencyLabel>
    </PriceInputContainer>
    </div>
  );
};

export default PriceInput;
