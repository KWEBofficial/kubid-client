import styled from "@emotion/styled";
import { Col, Row } from "antd";
import ProductInfo from "./ProductInfo";

const ProductDetailTag: React.FC = () => {
  return (
    <div>
      <StyledRow>
        <CenteredCol span={16} offset={4}>
          <ProductInfo />
        </CenteredCol>
      </StyledRow>
    </div>
  );
};

export default ProductDetailTag;

const StyledRow = styled(Row)`
  margin: 20px;
`;

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
`;
