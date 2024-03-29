import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, message, Space, Modal, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct, sellProduct } from "../../api/product";

const { Text } = Typography;

const SellerButtons: React.FC = () => {
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [sellSuccess, setSellSuccess] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (sellSuccess) {
      message.success({
        content: "낙찰이 완료되었어요!",
        style: {
          fontSize: "24px",
          fontWeight: "bold",
        },
      });
      setSellSuccess(false);
    }
  }, [sellSuccess]);

  if (productId === undefined) {
    return null;
  }
  // 미인증 사용자 handling
  const showLoginAlert = () => {
    Modal.warning({
      title: "로그인을 먼저 해주세요!",
      onOk() {
        navigate("/auth/sign-in");
      },
    });
  };

  // 입찰 포기하기 Modal 구현
  const showDeleteProductModal = () => {
    setIsDeleteProductModalOpen(true);
  };

  const handleDeleteProductOk = async () => {
    setIsDeleteProductModalOpen(false);
    try {
      await deleteProduct(productId);
      navigate("/");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).response.data.name === "UnauthorizedError") {
        showLoginAlert();
      } else {
        console.error(error);
      }
    }
  };

  const handleDeleteProductCancel = () => {
    setIsDeleteProductModalOpen(false);
  };

  // 바로 낙찰 관련 핸들링
  const handleSellNow = async () => {
    try {
      await sellProduct(productId);
      setSellSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Space style={{ marginBottom: "50px" }}>
      <BiddingButton type="primary" danger onClick={showDeleteProductModal}>
        글 삭제하기
      </BiddingButton>
      <Modal
        title="경매 취소 확인"
        open={isDeleteProductModalOpen}
        onOk={handleDeleteProductOk}
        onCancel={handleDeleteProductCancel}
      >
        <Text>
          정말 제품 글을 삭제하시겠어요? <br />
        </Text>
      </Modal>
      <BiddingButton onClick={() => navigate(`/products/modify/${productId}`)}>글 수정하기</BiddingButton>
      <BiddingButton type="primary" onClick={handleSellNow}>
        바로낙찰
      </BiddingButton>
    </Space>
  );
};

export default SellerButtons;

const BiddingButton = styled(Button)`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;
