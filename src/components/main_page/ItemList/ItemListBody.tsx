/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Col, Row } from "antd";
import ItemButton from "./ItemListBody/ItemButton";
import { ProductThumbnailInfo } from "../../../models/product";

interface ItemListBodyProps {
  products: ProductThumbnailInfo[];
}

const ItemListBody: React.FC<ItemListBodyProps> = ({ products }) => {
  return (
    <p css={BodyStyle}>
      <Row>
        <Col span={8}>
          <ItemButton product={products[0]} />
        </Col>
        <Col span={8}>
          <ItemButton product={products[1]} />
        </Col>
        <Col span={8}>
          <ItemButton product={products[2]} />
        </Col>
      </Row>
    </p>
  );
};

export default ItemListBody;

const BodyStyle = css`
  text-align: center;
  margin-bottom: 50px;
`;
