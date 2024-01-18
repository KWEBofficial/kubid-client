import ApiManager from "../index";

export const postGiveUpBidding = async (productId: string) => {
  const response = await ApiManager.post(`/products/bidding/give-up/${productId}`);
  return response;
};

export const postBidProduct = async (productId: string, biddingPrice: number) => {
  const response = await ApiManager.post(`/products/bidding/${productId}`, { biddingPrice });
  return response;
};
