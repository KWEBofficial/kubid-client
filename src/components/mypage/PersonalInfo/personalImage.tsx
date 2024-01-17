/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Button, Modal } from "antd";
import { getCurrentUser } from "../../../api/user/index";

import { ImageDTO } from "../../..//types/image/dto";
import ImageUploadButton from "../../../components/common/ImageUploadButton";

interface PersonalImageProps {
  imageURL: string;
}

const PersonalImage: React.FC<PersonalImageProps> = ({ imageURL }) => {
  // Construct the path to the image file based on the imageId
  const [image, setImage] = useState<ImageDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    if (image) {
      await updateProfile(image);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleImageChange = (image: ImageDTO) => {
    setImage(image);
  };
  const imagePath = imageURL; // Adjust the file extension if necessary
  console.log(image?.id);
  return (
    <>
      <div css={imageContainerStyle}>
        <img src={imagePath} alt={`Personal Image`} css={imageStyle} />
      </div>
      <Button type="primary" onClick={showModal}>
        사진 등록
      </Button>
      <Modal title="사진을 첨부해주세요" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <ImageUploadButton name="image" handleChange={handleImageChange} />
        {image && <img src={image.url} alt="image" />}
      </Modal>
    </>
  );
};

export default PersonalImage;
const imageContainerStyle = css`
  // Define styles for the container if necessary
`;

const imageStyle = css`
  width: 100%; // Example to make the image responsive
  height: auto;
  border-radius: 50%; // If you want a circular image
  // Add more styles as needed
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
