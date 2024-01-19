import ApiManager from "..";
import { CreateTagDTO } from "../../types/tag/dto";

export const deleteTag = async (tagId: number) => {
  const response = await ApiManager.delete(`/tags/${tagId}`);
  return response.data;
};

export const createTag = async (body: CreateTagDTO) => {
  const response = await ApiManager.post(`/tags`, body);
  return response.data;
};
