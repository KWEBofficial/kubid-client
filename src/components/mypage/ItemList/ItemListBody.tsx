/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Col, Row } from "antd";
import ItemButton from "./ItemListBody/ItemButton";
import { CurrentUserBuy, CurrentUserSell } from "../../../models/product";
import { Typography } from "antd";

const { Text } = Typography;

interface ItemListBodyProps {
  products: CurrentUserBuy[] | CurrentUserSell[];
  maxItemCount: number;
  showBidderCount?: boolean;
}

const ItemListBody: React.FC<ItemListBodyProps> = ({ products, maxItemCount, showBidderCount }) => {
  const itemCount = products.length < maxItemCount ? products.length : maxItemCount;

  return itemCount ? (
    <Row gutter={{ xs: 8, sm: 16, md: 16, lg: 24 }} css={BodyStyle}>
      {products?.slice(0, itemCount).map((product, idx) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={idx}>
          <ItemButton product={product} showBidderCount={showBidderCount} />
        </Col>
      ))}
    </Row>
  ) : (
    <div css={NoItemStyle}>
      <img src="/cat.png" alt="Image" css={NoItemImageStyle} /> <br />
      <Text italic>아직 올라온 상품이 없나 봐요.</Text>
    </div>
  );
};

export default ItemListBody;

const BodyStyle = css`
  text-align: center;
`;

const NoItemStyle = css`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NoItemImageStyle = css`
  width: 200px;
  margin-bottom: 10px;
`;
