import React, { useState } from "react";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import { Button, Flex, Card, Modal } from "antd";
import Tags from "../../components/ProductRegister/Tags";
import { FormContainer } from "../../components/ProductRegister/FormContainer";
import PriceInput from "../../components/ProductRegister/PriceInputContainer";
import { postProduct } from "../../api/product";
import { ProductInfo } from "../../models/product";
import ImageUploadButton from "../../components/common/ImageUploadButton";
import { ImageDTO } from "../../types/image/dto";
import { useNavigate } from "react-router";

const ProductRegister = () => {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    lowerBound: "",
    upperBound: "",
    tradeLocation: "",
    tradeDate: "",
  });

  const [image, setImage] = useState<ImageDTO | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleAddTag = (tag: string) => {
    if (tags.length === 3) return;
    setTags(tags.concat(tag));
  };

  const handleDeleteTag = (tag: string) => {
    /**
     * ["1", "2", "3"].filter((v) => v !== "1") -> ["2", "3"]
     */
    setTags(tags.filter((t) => t !== tag));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!image) throw new Error("이미지가 없습니다.");

      const body: ProductInfo = {
        productName: form.productName,
        desc: form.description,
        imageId: image.id,
        upperBound: Number(form.upperBound),
        lowerBound: Number(form.lowerBound),
        tradeLocation: form.tradeLocation,
        tradeDate: form.tradeDate,
        tags,
      };

      await postProduct(body);

      Modal.success({
        title: "성공!",
        content: "상품이 성공적으로 등록되었어요!",
        onOk: () => {
          navigate("/"); // 메인 페이지로 이동
        },
      });
    } catch (error) {
      console.error(error);
      Modal.error({
        title: "오류",
        content: "상품 등록 중 오류가 발생했어요!",
      });
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productName"
          placeholder="상품 이름을 입력해 주세요."
          value={form.productName}
          onChange={handleFormChange}
          style={{ height: "50px", fontSize: "16px", width: "700px" }}
        />

        <ImageUploadButton name="upload-image" handleChange={(image) => setImage(image)} />

        <Card>
          <label htmlFor="price">경매 가격대</label>
          <PriceInput lowerBound={form.lowerBound} upperBound={form.upperBound} handleFormChange={handleFormChange} />
        </Card>
        <Card>
          <label>거래 장소/일시</label>

          <div className="input-group">
            <label>거래 장소</label>
            <input type="text" name="tradeLocation" value={form.tradeLocation} onChange={handleFormChange} />
          </div>
          <div></div>
          <div className="input-group">
            <label>거래 일시</label>
            <input type="date" name="tradeDate" value={form.tradeDate} onChange={handleFormChange} />
          </div>
        </Card>
        <Card>
          <div className="desc">
            <textarea
              name="description"
              style={{ width: "100%", height: "130px", padding: "10px", resize: "none", fontSize: "15px" }}
              placeholder="상품 설명을 입력해 주세요."
              value={form.description}
              onChange={handleFormChange}
            />
          </div>

          <Tags tags={tags} addTag={handleAddTag} deleteTag={handleDeleteTag} />
        </Card>

        <Flex gap="large" wrap="wrap" justify="center">
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
