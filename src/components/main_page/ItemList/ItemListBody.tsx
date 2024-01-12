/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Col, Row } from "antd";
import ItemButton from "./ItemListBody/ItemButton";
import { ProductThumbnailInfo } from "../../../models/product";

interface ItemListBodyProps {
  products: ProductThumbnailInfo[];
  maxItemCount: number;
}

const ItemListBody: React.FC<ItemListBodyProps> = ({ products, maxItemCount }) => {
  const items = [];
  const itemCount = products.length < maxItemCount ? products.length : maxItemCount;
  for (let i = 0; i < itemCount; i++) {
    items.push(
      <Col span={8}>
        <ItemButton product={products[i]} />
      </Col>,
    );
  }

  return (
    <div css={BodyStyle}>
      <Row>{items}</Row>
    </div>
  );
};

export default ItemListBody;

const BodyStyle = css`
  text-align: center;
  margin-bottom: 0;
`;
