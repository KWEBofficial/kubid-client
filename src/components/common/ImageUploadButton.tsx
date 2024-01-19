import styled from "@emotion/styled";
import { Button } from "antd";
import { uploadImage } from "../../utils/uploadImage";
import { ImageDTO } from "../../types/image/dto";

interface Props {
  name: string;
  handleChange: (image: ImageDTO) => void;
}

const ImageUploadButton: React.FC<Props> = ({ name, handleChange }) => {
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const image = await uploadImage(file);

    if (!image) return;

    handleChange(image);
  };

  return (
    <StyledButton>
      <label htmlFor={name}>첨부하기</label>
      <input type="file" id={name} name={name} style={{ display: "none" }} onChange={handleUploadImage} hidden />
    </StyledButton>
  );
};

export default ImageUploadButton;

const StyledButton = styled(Button)``;
