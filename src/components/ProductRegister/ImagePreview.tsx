import { useState } from "react";
import styled from "@emotion/styled";

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;

  .upload-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #f0f0f0;
    cursor: pointer;
  }

  .image-preview {
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .image-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .image-note {
    display: block; 
    margin-top: 8px;
  }
`;

const ImageUpload = () => {
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <ImageUploadContainer>
      <label className="upload-btn">
        상품 이미지 올리기
        <input type="file" onChange={handleImageChange} style={{ display: "none" }} />
      </label>
      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="상품 이미지 미리보기" />
        </div>
      )}
      <div className="image-note">이미지는 1개만 올릴 수 있습니다.</div>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
