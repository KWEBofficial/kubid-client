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

export interface ProductTempDTO {
  id: number;
  productName: string;
  user_id: number;
  status: "progress" | "complete";
  currentHighestPrice: number | null;
  lowerBound: number;
  upperBound: number;
  image: ImageDTO;
  department_id: number;
  created_at: string;
  updated_at: string;
}

/**
 *     "id": 4,
    "productName": "Product 1",
    "user_id": 1,
    "status": "progress",
    "lowerBound": 5000,
    "upperBound": 10000,
    "department_id": 1,
    "created_at": "2024-01-15T03:39:13.477Z",
    "updated_at": "2024-01-15T03:39:13.477Z",
    "currentHighestPrice": null,
    "image": {
      "id": 1,
      "url": "http://localhost:3000/1.jpeg"
    },
    "bidderCount": 0
 */
