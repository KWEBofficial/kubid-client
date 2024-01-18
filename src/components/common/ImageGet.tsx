import { Image } from "antd";

interface ImageGetProps {
  maxHeight?: number;
  maxWidth?: string;
  src: string;
}

const ImageGet: React.FC<ImageGetProps> = ({ maxHeight, maxWidth, src }) => {
  return <Image style={{ maxHeight, maxWidth, borderRadius: "10px" }} src={src} />;
};

export default ImageGet;
