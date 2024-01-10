import { Col, Row } from "antd";
import ItemButton from "./ItemList/ItemButton";

const ItemList = () => {
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

export default ItemList;
