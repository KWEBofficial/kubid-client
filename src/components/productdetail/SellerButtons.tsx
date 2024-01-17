import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Space, Modal, Typography } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/product";

const { Text } = Typography;

const SellerButtons: React.FC = () => {
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const { productId } = useParams();
  const navigate = useNavigate();
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
      window.location.reload();
    } catch (error) {
      if (error.response.data.name === "UnauthorizedError") {
        showLoginAlert();
      } else {
        console.error(error);
      }
    }
  };

  const handleDeleteProductCancel = () => {
    setIsDeleteProductModalOpen(false);
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
      <BiddingButton>글 수정하기</BiddingButton>
      <BiddingButton type="primary">바로낙찰</BiddingButton>
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
