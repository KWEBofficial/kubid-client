import React, { useRef, useState } from "react";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import { Button, Flex, Card, Modal, DatePicker, Input, Form } from "antd";
import Tags from "../../components/ProductRegister/Tags";
import { FormContainer } from "../../components/ProductRegister/FormContainer";
import PriceInput from "../../components/ProductRegister/PriceInputContainer";
import { postProduct } from "../../api/product";
import { ProductInfo } from "../../models/product";
import ImageUploadButton from "../../components/common/ImageUploadButton";
import { ImageDTO } from "../../types/image/dto";
import { useNavigate } from "react-router";
import { TagDTO } from "../../types/tag/dto";
import dayjs from "dayjs";

const ProductRegister = () => {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    lowerBound: "",
    upperBound: "",
    tradeLocation: "",
    tradeDate: dayjs(),
  });

  const [image, setImage] = useState<ImageDTO | null>(null);
  const [tags, setTags] = useState<TagDTO[]>([]);
  const tagRef = useRef(-1);
  const navigate = useNavigate();

  const handleAddTag = (tag: string) => {
    if (tags.length === 3) return;
    setTags(tags.concat({ id: tagRef.current--, tag }));
  };

  const handleDeleteTag = (tagId: number) => {
    /**
     * ["1", "2", "3"].filter((v) => v !== "1") -> ["2", "3"]
     */
    setTags(tags.filter((t) => t.id !== tagId));
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
        tradeDate: form.tradeDate.format("YYYY-MM-DD HH:mm"),
        tags: tags.map((tag) => tag.tag),
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
        content: "이미지를 등록해 주세요!",
      });
    }
  };

  return (
    <FormContainer>
      <Form onFinish={handleSubmit}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "상품 이름을 입력해주세요!",
            },
          ]}
        >
          <Input
            name="productName"
            placeholder="상품 이름을 입력해 주세요."
            value={form.productName}
            onChange={handleFormChange}
            style={{ height: "50px", fontSize: "16px", width: "700px" }}
          />
        </Form.Item>

        <ImageUploadButton name="upload-image" handleChange={(image) => setImage(image)} />
        {image && <img src={image.url} alt="image" style={{ width: "200px" }} />}

        <Card>
          <label htmlFor="price">경매 가격대</label>
          <PriceInput lowerBound={form.lowerBound} upperBound={form.upperBound} handleFormChange={handleFormChange} />
        </Card>
        <Card>
          <label>거래 장소/일시</label>

          <div className="input-group">
            <label>거래 장소</label>
            <Input type="text" name="tradeLocation" value={form.tradeLocation} onChange={handleFormChange} />
          </div>
          <div></div>
          <div className="input-group">
            <label>거래 일시</label>
            <DatePicker
              name="tradeDate"
              value={form.tradeDate}
              format={"YYYY-MM-DD HH:mm"}
              onChange={(value) => {
                if (!value) return;

                setForm({ ...form, tradeDate: value });
              }}
              allowClear={false}
              showTime={{
                showSecond: false,
              }}
            />
          </div>
        </Card>
        <Card>
          <div className="desc">
            <Input.TextArea
              placeholder="상품 설명을 입력해 주세요."
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={6}
              style={{ resize: "none" }}
            />
          </div>

          <Tags tags={tags} addTag={handleAddTag} deleteTag={handleDeleteTag} />
        </Card>

        <Flex gap="large" wrap="wrap" justify="center">
          <Button type="primary" onClick={handleSubmit}>
            상품 등록
          </Button>
        </Flex>
      </Form>
    </FormContainer>
  );
};

const ProductRegisterPage = HigherLayoutComponent(ProductRegister);
export default ProductRegisterPage;
