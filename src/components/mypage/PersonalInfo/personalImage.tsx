/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface PersonalImageProps {
  imageId: number;
}

const PersonalImage: React.FC<PersonalImageProps> = ({ imageId }) => {
  // Construct the path to the image file based on the imageId
  const imagePath = `../../public/${imageId}.png`; // Adjust the file extension if necessary

  return (
    <div css={imageContainerStyle}>
      <img src={imagePath} alt={`Personal Image ${imageId}`} css={imageStyle} />
    </div>
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
