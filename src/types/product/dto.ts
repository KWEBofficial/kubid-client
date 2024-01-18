import { ImageDTO } from "../image/dto";

export interface ProductDTO {
  id: number;
  productName: string;
  userId: number;
  status: "progress" | "complete";
  currentHighestPrice: number | null;
  lowerBound: number;
  upperBound: number;
  image: ImageDTO;
  departmentId: number;
  createdAt: string;
  updatedAt: string;
}
