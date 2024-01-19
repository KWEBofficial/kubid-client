import styled from "@emotion/styled";
import { Input } from "antd";

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
  display: block; // "원"을 인라인 블록으로 만들어 입력 필드와 같은 줄에 표시
  font-weight: bold;
  font-size: large;
`;

interface Props {
  lowerBound: string;
  upperBound: string;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// 가격 입력
const PriceInput: React.FC<Props> = ({ lowerBound, upperBound, handleFormChange }) => {
  return (
    <div>
      <PriceInputContainer>
        <label htmlFor="lowerBound">얼마에 시작하시겠어요?</label>
        <Input type="text" name="lowerBound" placeholder="하한가" value={lowerBound} onChange={handleFormChange} />
        <CurrencyLabel>원</CurrencyLabel>
      </PriceInputContainer>
      <PriceInputContainer>
        <label htmlFor="upperBound">얼마에 바로 낙찰하시겠어요?</label>
        <Input type="text" name="upperBound" placeholder="상한가" value={upperBound} onChange={handleFormChange} />
        <CurrencyLabel>원</CurrencyLabel>
      </PriceInputContainer>
    </div>
  );
};

export default PriceInput;
