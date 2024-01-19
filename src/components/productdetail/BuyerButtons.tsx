import styled from "@emotion/styled";
import React, { useState } from "react";
import { Button, Space, Modal, Typography, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { postGiveUpBidding, postBidProduct } from "../../api/biddings";

const { Text } = Typography;

const BiddingButton = styled(Button)`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

interface BuyerButtonsProps {
  values: {
    lowerBound: number;
    currentHighestPrice: number;
    upperBound: number;
  };
}

const BuyerButtons: React.FC<BuyerButtonsProps> = ({ values }) => {
  const [isGiveUpModalOpen, setIsGiveUpModalOpen] = useState(false);
  const [isRebidModalOpen, setIsRebidModalOpen] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [biddingPrice, setBiddingPrice] = useState(values.currentHighestPrice);
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
  const showGiveUpModal = () => {
    setIsGiveUpModalOpen(true);
  };

  const handleGiveUpOk = async () => {
    setIsGiveUpModalOpen(false);
    try {
      await postGiveUpBidding(productId);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGiveUpCancel = () => {
    setIsGiveUpModalOpen(false);
  };

  // 재입찰하기 Modal 구현
  const showRebidModal = () => {
    setIsRebidModalOpen(true);
  };

  const handleRebidOk = async () => {
    setIsRebidModalOpen(false);
    try {
      await postBidProduct(productId, biddingPrice);
      window.location.reload();
    } catch (error) {
      if (error.response.data.name === "UnauthorizedError") {
        showLoginAlert();
      } else {
        console.error(error);
      }
    }
  };

  const handleRebidCancel = () => {
    setIsRebidModalOpen(false);
  };

  // 바로구매하기 Modal 구현
  const showBuyNowModal = () => {
    setIsBuyNowModalOpen(true);
  };

  const handleBuyNowOk = async () => {
    setIsBuyNowModalOpen(false);
    try {
      await postBidProduct(productId, values.upperBound);
      window.location.reload();
    } catch (error) {
      if (error.response.data.name === "UnauthorizedError") {
        showLoginAlert();
      } else {
        console.error(error);
      }
    }
  };

  const handleBuyNowCancel = () => {
    setIsBuyNowModalOpen(false);
  };

  // 입찰가 handling
  const handleBiddingPriceChange = (value: number | null) => {
    if (value !== null) {
      const adjustedPrice = Math.max(values.lowerBound, Math.min(values.upperBound, value));
      setBiddingPrice(adjustedPrice);
    }
  };

  const handleDecrease = () => {
    setBiddingPrice(Math.max(values.lowerBound, biddingPrice - 100));
  };

  const handleIncrease = () => {
    setBiddingPrice(Math.min(values.upperBound, biddingPrice + 100));
  };

  return (
    <Space style={{ marginBottom: "50px" }}>
      <BiddingButton type="primary" danger onClick={showGiveUpModal}>
        포기하기
      </BiddingButton>
      <Modal title="입찰 포기 확인" open={isGiveUpModalOpen} onOk={handleGiveUpOk} onCancel={handleGiveUpCancel}>
        <Text>
          경매 참여를 취소하시겠어요? <br />
          취소하면 지금까지의 입찰 내역이 모두 사라져요!
        </Text>
      </Modal>
      <BiddingButton onClick={showRebidModal}>재입찰</BiddingButton>
      <Modal
        title="재입찰가 확인"
        open={isRebidModalOpen}
        onCancel={handleRebidCancel}
        style={{
          height: "60px",
          width: "100%",
          fontSize: "24px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
        footer={[]}
      >
        <Space direction="vertical" style={{ width: "100%", textAlign: "center", marginTop: "40px" }}>
          <Space align="center">
            <Text type="secondary" style={{ fontSize: "16px", marginLeft: "30px" }}>
              {values.lowerBound}
            </Text>
            <PriceButton type="default" onClick={handleDecrease}>
              <Text style={{ fontSize: "24px", fontWeight: "bolder" }}>-</Text>
            </PriceButton>
            <InputNumber
              value={biddingPrice}
              onChange={handleBiddingPriceChange}
              style={{ height: "50px", width: "160px", fontSize: "28px", fontWeight: "bolder" }}
            />
            <PriceButton type="default" onClick={handleIncrease}>
              <Text style={{ fontSize: "24px", fontWeight: "bolder" }}>+</Text>
            </PriceButton>
            <Text type="secondary" style={{ fontSize: "16px", marginTop: "30px" }}>
              {values.upperBound}
            </Text>
          </Space>
        </Space>
        <Space style={{ marginTop: "40px" }}>
          <Button key="back" onClick={handleRebidCancel}>
            취소하기
          </Button>
          <Button key="submit" type="primary" onClick={handleRebidOk}>
            입찰하기
          </Button>
        </Space>
      </Modal>
      <BiddingButton type="primary" onClick={showBuyNowModal}>
        바로구매
      </BiddingButton>
      <Modal
        title="바로구매"
        open={isBuyNowModalOpen}
        onCancel={handleBuyNowCancel}
        style={{
          height: "60px",
          width: "100%",
          fontSize: "24px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
        footer={[]}
      >
        <Text style={{ fontSize: "16px" }}>
          <br />
          상한가인&nbsp;&nbsp;&nbsp;&nbsp;
        </Text>
        <Text style={{ fontSize: "24px", color: "#1D88D6" }}>{values.upperBound}</Text>
        <Text style={{ fontSize: "16px" }}>&nbsp;&nbsp;&nbsp;&nbsp;원으로 입찰하시겠어요?</Text>
        <br />
        <Space style={{ marginTop: "40px" }}>
          <Button key="back" onClick={handleBuyNowCancel}>
            취소하기
          </Button>
          <Button key="submit" type="primary" onClick={handleBuyNowOk}>
            입찰하기
          </Button>
        </Space>
      </Modal>
    </Space>
  );
};

export default BuyerButtons;

const PriceButton = styled(Button)`
  width: 50px;
  height: 50px;
  background-color: transparent;
`;
