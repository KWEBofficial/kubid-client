export interface TagDTO {
  id: number;
  tag: string;
}

export interface CreateTagDTO {
  productId: number;
  tag: string[];
}
