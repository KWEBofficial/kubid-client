import React, { useState } from "react";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import { Button, Flex, Card } from "antd";
import Tags from "../../components/ProductRegister/Tags";
import { FormContainer } from "../../components/ProductRegister/FormContainer";
import ImageUpload from "../../components/ProductRegister/ImagePreview";
import PriceInput from "../../components/ProductRegister/PriceInputContainer";

const ProductRegister = () => {
  const [productName, setProductName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  //const [tag, setDesc] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 폼 제출 로직 처리
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="상품 이름을 입력해 주세요."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ height: "50px", fontSize: "16px" }}
        />

        <ImageUpload/>

        <Card>
          <label htmlFor="price">경매 가격대</label>
          <PriceInput/>
        </Card>
        <Card>
          <label htmlFor="location">거래 장소/일시</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input type="datetime-local" id ="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Card>
        <Card>
          <textarea
            id="desc"
            name="desc"
            placeholder="상품 설명을 입력해 주세요."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label htmlFor="tag">#태그를 입력해 주세요.(최대3개)</label>

          <Flex>
            <Tags></Tags>
          </Flex>
        </Card>
        <Flex gap="small" wrap="wrap">
          <Button type="primary">상품 등록</Button>
        </Flex>
      </form>
    </FormContainer>
  );
};

const ProductRegisterPage = HigherLayoutComponent(ProductRegister);
export default ProductRegisterPage;
