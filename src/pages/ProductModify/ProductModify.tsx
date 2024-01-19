import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import HigherLayoutComponent from "../../components/common/CustomLayout";
import { updateProduct } from "../../api/product";
import { ImageDTO } from "../../types/image/dto";
import { Modal, Card, Flex, Button, Input, Form, DatePicker } from "antd";
import { UpdateProductDTO } from "../../models/product";
import { FormContainer } from "../../components/ProductRegister/FormContainer";
import ImageUploadButton from "../../components/common/ImageUploadButton";
import PriceInput from "../../components/ProductRegister/PriceInputContainer";
import Tags from "../../components/ProductRegister/Tags";
import { useFecth } from "../../hooks/useFetch";
import { TagDTO } from "../../types/tag/dto";
import { deleteTag, createTag } from "../../api/tag";
import dayjs from "dayjs";

const ProductModify = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Initial state setup
  const [form, setForm] = useState<any>({
    productName: "",
    description: "",
    lowerBound: "",
    upperBound: "",
    tradeLocation: "",
    tradeDate: dayjs(),
  });

  const { data, isLoading } = useFecth<any>(`/products/${productId}`);
  const [image, setImage] = useState<ImageDTO | null>(null);
  const [tags, setTags] = useState<TagDTO[]>([]);
  const tagIdRef = useRef(-1);

  // Fetch product data
  useEffect(() => {
    data && setForm({ ...data, tradeDate: dayjs(data.tradeDate) });
    data && setTags(data.tags);
    data && setImage(data.image);
  }, [data]);

  if (!data || isLoading) return <div>로딩 중...</div>;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTag = (tag: string) => {
    if (tags.length === 3) return;

    setTags(tags.concat({ id: tagIdRef.current--, tag }));
  };

  const handleDeleteTag = (tagId: number) => {
    /**
     * ["1", "2", "3"].filter((v) => v !== "1") -> ["2", "3"]
     */
    setTags(tags.filter((t) => t.id !== tagId));
  };

  // Modify existing product
  const handleModify = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!image) throw new Error("이미지가 없습니다.");

      const updatedProduct: UpdateProductDTO = {
        productName: form.productName,
        desc: form.description,
        imageId: image.id,
        upperBound: Number(form.upperBound),
        lowerBound: Number(form.lowerBound),
        tradingPlace: form.tradeLocation,
        tradingTime: form.tradeDate,
      };

      await updateProduct(Number(productId), updatedProduct);

      data.tags.forEach(async (tag: TagDTO) => {
        const found = tags.find((formTag) => formTag.id === tag.id);
        if (!found) {
          await deleteTag(tag.id);
        }
      });

      const createTags = tags.filter((tag) => tag.id < 0).map((tag) => tag.tag);
      await createTag({ productId: Number(productId), tag: createTags });

      Modal.success({
        title: "성공!",
        content: "상품이 성공적으로 수정되었어요!",
        onOk: () => {
          navigate("/"); // 메인 페이지로 이동
        },
      });
    } catch (error) {
      console.error(error);
      Modal.error({
        title: "오류",
        content: "상품 수정 중 오류가 발생했어요!",
      });
    }
  };

  return (
    <FormContainer>
      <Form onFinish={handleModify}>
        <Form.Item
          rules={[
            {
              required: true,
              message: "상품 이름을 입력해주세요!",
            },
          ]}
        >
          <Input
            type="text"
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
          <Button type="primary" onClick={handleModify}>
            글 수정하기
          </Button>
        </Flex>
      </Form>
    </FormContainer>
  );
};

const ProductModifyPage = HigherLayoutComponent(ProductModify);

export default ProductModifyPage;
