import React, { useState } from "react";
import HigherLayoutComponent from "../components/common/CustomLayout";
import { Button, Flex } from "antd";

const ProductRegister = () => {
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  //const [tag, setDesc] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 폼 제출 로직 처리
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">상품 이미지 올리기</label>
        <input type="file" id="image" name="image" onChange={(e) => setImage(e.target.value)} />

        <label htmlFor="desc">경매 가격대</label>
        <input type="text" id="desc" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} />

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
        

        <Flex gap="small" wrap="wrap">
          <Button type="primary">상품 등록</Button>
        </Flex>

      </form>
      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: auto;
        }
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
      `}</style>
    </div>
  );
};

const ProductRegisterPage = HigherLayoutComponent(ProductRegister);
export default ProductRegisterPage;
