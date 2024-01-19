import styled from "@emotion/styled";
import { Image } from "antd";
import { colors } from "../../styles/colors";

interface ImageGetProps {
  src: string;
}

const ImageGet: React.FC<ImageGetProps> = ({ src }) => {
  return (
    <ImageBox>
      <Image style={{ borderRadius: "10px", objectFit: "fill" }} src={src} />
    </ImageBox>
  );
};

export default ImageGet;

const ImageBox = styled.div`
  height: 500px;
  width: 100%;
  background-color: ${colors.imageBg};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
