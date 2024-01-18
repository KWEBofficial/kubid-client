import styled from "@emotion/styled";
import { Col, Row } from "antd";
import ProductInfo from "./ProductInfo";

const ProductDetailTag: React.FC = () => {
  return (
    <ProductBox>
      <StyledRow>
        <CenteredCol span={16} offset={4}>
          <ProductInfo />
        </CenteredCol>
      </StyledRow>
    </ProductBox>
  );
};

export default ProductDetailTag;

const ProductBox = styled.div`
  padding: 50px;
  margin: 50px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const StyledRow = styled(Row)`
  margin: 20px;
`;

const CenteredCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
`;
