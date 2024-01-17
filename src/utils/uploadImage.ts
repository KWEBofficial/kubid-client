import { imageUpload, prepareImageUpload } from "../api/image";
import { ImageDTO } from "../types/image/dto";

export const uploadImage = async (file: File): Promise<ImageDTO | null> => {
  try {
    const imageId = await prepareImageUpload();

    const formData = new FormData();
    
    formData.append("image", file);

    const uploadedImage = await imageUpload(imageId, formData);

    return uploadedImage;
  } catch (error) {
    console.error(error);
    return null;
  }
};
