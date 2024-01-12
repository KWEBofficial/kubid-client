/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Col, Row } from "antd";
import ItemButton from "./ItemListBody/ItemButton";
import { ProductThumbnailInfo } from "../../../models/product";
import { Typography } from "antd";

const { Text, Title } = Typography;

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

  if (itemCount) {
    return (
      <div css={BodyStyle}>
        <Row>{items}</Row>
      </div>
    );
  } else {
    return (
      <div css={NoItemStyle}>
        <img src={"cat.png"} alt="Image" css={NoItemImageStyle} /> <br />
        <Text italic>아직 올라온 상품이 없나 봐요.</Text>
      </div>
    );
  }
};

export default ItemListBody;

const BodyStyle = css`
  text-align: center;
  margin-bottom: 0;
`;

const NoItemStyle = css`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NoItemImageStyle = css`
  width: 20%;
  margin-bottom: 10px;
`;
