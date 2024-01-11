/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Col, Row } from "antd";
import ItemButton from "./ItemListBody/ItemButton";

const ItemListBody = () => {
  return (
    <p css={BodyStyle}>
      <Row>
        <Col span={8}>
          <ItemButton />
        </Col>
        <Col span={8}>
          <ItemButton />
        </Col>
        <Col span={8}>
          <ItemButton />
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
