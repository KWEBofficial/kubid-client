import React, { useState } from "react";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import { Button, Flex, Card, message } from "antd";
import Tags from "../../components/ProductRegister/Tags";
import { FormContainer } from "../../components/ProductRegister/FormContainer";
import ImageUpload from "../../components/ProductRegister/ImagePreview";
import PriceInput from "../../components/ProductRegister/PriceInputContainer";
import { postProduct } from "../../api/product";
import { AxiosError } from "axios";
import { COMMON_MESSAGE } from "../../contants/message";
import { ProductInfo } from "../../models/product";

const ProductRegister = () => {
  const [id, setId] = useState(0);
  const [product_name, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageId, setImageId] = useState(0);
  const [upperBound, setUpperBound] = useState(0);
  const [lowerBound, setLowerBound] = useState(0);
  const [department, setDepartment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tradeLocation, setTradeLocation] = useState("");
  const [tradeDate, setTradeDate] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    //id 자동 증가
    setId((prevId) => prevId + 1);
    // 상품 정보 객체 생성
    const productInfo: ProductInfo = {
      id,
      product_name,
      desc,
      imageId,
      upperBound,
      lowerBound,
      department,
      tags,
      tradeLocation,
      tradeDate,
    };
    console.log(productInfo);

    try {
      // postProduct 함수를 호출하여 상품 정보를 서버에 전송
      const response = await postProduct(productInfo);
      console.log(response); // 응답 처리 (예: 성공 메시지 표시)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 인증 오류 메시지 표시
        message.error("인증 오류");
      } else {
        // 기타 오류 메시지 표시
        message.error("오류 발생");
      }
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="productName"
          name="productName"
          placeholder="상품 이름을 입력해 주세요."
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          style={{ height: "50px", fontSize: "16px", width: "700px" }}
        />

        <ImageUpload />

        <Card>
          <label htmlFor="price">경매 가격대</label>
          <PriceInput />
        </Card>
        <Card>
          <label htmlFor="location">거래 장소/일시</label>

          <div className="input-group">
            <label htmlFor="location">거래 장소</label>
            <input
              type="text"
              id="location"
              name="location"
              value={tradeLocation}
              onChange={(e) => setTradeLocation(e.target.value)}
            />
          </div>
          <div></div>
          <div className="input-group">
            <label htmlFor="date">거래 일시</label>

            <input
              type="datetime-local"
              id="date"
              name="date"
              value={tradeDate}
              onChange={(e) => setTradeDate(e.target.value)}
            />
          </div>
        </Card>
        <Card>
          <div className="desc">
            <textarea
              id="desc"
              name="desc"
              style={{ width: "100%", height: "150px", padding: "10px", resize: "none" }}
              placeholder="상품 설명을 입력해 주세요."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <label htmlFor="tag">#태그를 입력해 주세요.(최대3개)</label>

          <Tags tags={tags} setTags={setTags} />
        </Card>
        <Flex gap="small" wrap="wrap">
          <Button type="primary" onClick={handleSubmit}>
            상품 등록
          </Button>
        </Flex>
      </form>
    </FormContainer>
  );
};

const ProductRegisterPage = HigherLayoutComponent(ProductRegister);
export default ProductRegisterPage;
