import React, { useState } from "react";

const ImagePreview = () => {
  const [previewSrc, setPreviewSrc] = useState("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewSrc && <img src={previewSrc} alt="Image preview" />}

      <style jsx>{`
        .form-container {
          max-width: 600px;
          margin: auto;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        .image-preview {
          max-width: 300px;
          height: auto;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default ImagePreview;


