import { Col, Row } from "antd";
import ItemButton from "./ItemListBody/ItemButton";

const ItemListBody = () => {
  return (
    <p style={{ textAlign: "center", marginBottom: "50px" }}>
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
