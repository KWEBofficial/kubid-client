/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { Button, Modal } from "antd";
import { patchUserDetails } from "../../../api/users";
import { ImageDTO } from "../../..//types/image/dto";
import ImageUploadButton from "../../../components/common/ImageUploadButton";
import { ProfileImageChangeInfo } from "../../../models/user";

interface PersonalImageProps {
  imageURL: string;
}
const defaultImageUrl = "../../../public/cat.png";
const PersonalImage: React.FC<PersonalImageProps> = ({ imageURL }) => {
  // Construct the path to the image file based on the imageId
  const [newimage, setImage] = useState<ImageDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    if (newimage) {
      const profileImageChangeInfo: ProfileImageChangeInfo = {
        image: newimage,
      };
      await patchUserDetails(profileImageChangeInfo);
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleImageChange = (image: ImageDTO) => {
    setImage(image);
  };
  const shouldShowDefaultImage = imageURL === ""; // Check if imageURL is empty
  const imagePath = shouldShowDefaultImage ? defaultImageUrl : imageURL;
  console.log(newimage?.id);
  return (
    <div css={containerStyle}>
      <img
        src={imagePath}
        alt={`Profile Image`}
        css={imageStyle}
        onError={(e) => {
          e.currentTarget.src = defaultImageUrl;
        }}
      />
      <Button type="primary" ghost onClick={showModal}>
        사진 등록
      </Button>
      <Modal title="사진을 첨부해주세요" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <ImageUploadButton name="image" handleChange={handleImageChange} />
        {newimage && <img src={newimage.url} alt="image" css={previewImageStyle} />}
      </Modal>
    </div>
  );
};

export default PersonalImage;

const imageStyle = css`
  width: 100%;
  height: auto;
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  border: 2px solid #eee; /* Border around the image */
  align-self: center; /* Align the image in the center of the container */
`;
const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 100px;
`;
const previewImageStyle = css`
  max-width: 100%; /* Ensures image width does not exceed the modal's width */
  height: auto; /* Maintains the aspect ratio of the image */
  display: block; /* Removes any extra space around the image */
  margin-top: 10px; /* Adds a top margin of 10px */
  margin-left: auto; /* Centers the image horizontally */
  margin-right: auto;
`;
