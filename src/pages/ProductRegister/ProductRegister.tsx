import React, { useState } from "react";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import { Button, Flex } from "antd";
import { css } from "@emotion/react";
import Tags from "../../components/PrductRegister/Tags";
import ImagePreview from "../../components/PrductRegister/ImagePreview";
import { FormContainer } from "../../components/PrductRegister/FormContainer";
import { ImagePreviewContainer } from "../../styles/ImagePreviewContainer";


const style = css`
  
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-top: 10px;
  }
  input,
  textarea,
  button {
    margin-top: 5px;
  }
  button {
    margin-top: 20px;
  }

  .image-preview {
    max-width: 50px; // Adjust the max-width as needed for your layout
    height: 300px; // This will maintain the aspect ratio of the image
    margin-top: 10px;
    border: 1px solid #ddd; // Optional: adds a border around the image
    border-radius: 4px; // Optional: rounds the corners of the border
    padding: 5px; // Optional: adds some space inside the border
  }
`;
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

        <ImagePreviewContainer>
          <ImagePreview/>
        </ImagePreviewContainer>

        <label htmlFor="price">경매 가격대</label>
        <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label htmlFor="location">거래 장소/일시</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input type="datetime-local" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label htmlFor="desc">상품 설명을 입력해 주세요.</label>
        <textarea id="desc" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />

        <label htmlFor="tag">#태그를 입력해 주세요.(최대3개)</label>

        <Flex>
          <Tags></Tags>
        </Flex>

        <Flex gap="small" wrap="wrap">
          <Button type="primary">상품 등록</Button>
        </Flex>
      </form>
    </FormContainer>
  );
};

const ProductRegisterPage = HigherLayoutComponent(ProductRegister);
export default ProductRegisterPage;
