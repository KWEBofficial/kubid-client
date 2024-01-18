import { useState } from "react";
import styled from "@emotion/styled";
import { Button, Space, Modal, Typography, InputNumber } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { postBidProduct } from "../../api/biddings";

const { Text } = Typography;

interface InitialButtonsProps {
  values: {
    lowerBound: number;
    currentHighestPrice: number;
    upperBound: number;
  };
}

const InitialButtons: React.FC<InitialButtonsProps> = ({ values }) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const initialBiddingPrice =
    values.currentHighestPrice !== undefined || values.currentHighestPrice !== null
      ? values.currentHighestPrice
      : values.lowerBound;
  const [biddingPrice, setBiddingPrice] = useState(initialBiddingPrice);
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

  // 입찰하기 Modal 구현
  const showBidModal = () => {
    setIsBidModalOpen(true);
  };

  const handleBidOk = async () => {
    setIsBidModalOpen(false);
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

  const handleBidCancel = () => {
    setIsBidModalOpen(false);
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
      <BiddingButton onClick={showBidModal}>입찰</BiddingButton>
      <Modal
        title="입찰가 확인"
        open={isBidModalOpen}
        onCancel={handleBidCancel}
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
          <Button key="back" onClick={handleBidCancel}>
            취소하기
          </Button>
          <Button key="submit" type="primary" onClick={handleBidOk}>
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

export default InitialButtons;

const BiddingButton = styled(Button)`
  width: 200px;
  height: 50px;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

const PriceButton = styled(Button)`
  width: 50px;
  height: 50px;
  background-color: transparent;
`;
