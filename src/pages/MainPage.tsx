import HigherLayoutComponent from "../components/common/CustomLayout";
import { useState } from "react";
import { ImageDTO } from "../types/image/dto";
import ImageUploadButton from "../components/common/ImageUploadButton";

const Main = () => {
  const [image, setImage] = useState<ImageDTO | null>(null);
  const handleImageChange = (image: ImageDTO) => {
    setImage(image);
  };

  return (
    <div>
      <ImageUploadButton name="image" handleChange={handleImageChange} />
      {image && <img src={image.url} alt="image" />}
    </div>
  );
};

const MainPage = HigherLayoutComponent(Main);

export default MainPage;
