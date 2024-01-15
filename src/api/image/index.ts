import ApiManager from "..";
import { ImageDTO } from "../../types/image/dto";

export const prepareImageUpload = async (): Promise<number> => {
  const response = await ApiManager.post<{ id: number }>("/image/prepare-upload");
  return response.data.id;
};

export const imageUpload = async (imageId: number, formData: FormData): Promise<ImageDTO> => {
  const response = await ApiManager.post<{ result: ImageDTO }>(`/image/upload/${imageId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.result;
};
