import React, { useState } from 'react';
import uploadIcon from 'assets/icons/uploadIcon.png';
import tw, { styled, css } from 'twin.macro';
import Button from 'components/common/Button';

const ImageContainer = styled.div`
  ${tw`flex flex-col justify-center items-center w-[50vw] h-[40vw] mt-[80px] `}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;
const ImageItem = ({ onImageSelect, onDeleteImage, id }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      onImageSelect(id, file);
    }
  };

  const handleDeleteImage = () => {
    onDeleteImage(id);
  };

  return (
    <ImageContainer>
      <div className="image-upload-container">
        {imageUrl ? (
          <img
            className="image-upload-preview w-[30vw] h-[40vw] "
            src={imageUrl}
            alt="upload-preview"
            onClick={() => document.getElementById(`file-input-${id}`).click()}
          />
        ) : (
          <div
            className="image-upload-placeholder"
            onClick={() => document.getElementById(`file-input-${id}`).click()}
          >
            <div className="flex flex-col justify-center items-center w-[30vw] h-[40vw] cursor-pointer border-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                src={uploadIcon}
                alt="upload_image_button"
                className="w-[4rem] h-[4rem] fill-primary"
                // onClick={clickFunction}
              >
                <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
              </svg>
              <span className="mt-10">권장 이미지 비율은 3:4 입니다.</span>
              <span>
                화면에 보이는 미리보기가 실제 뷰어에서 보이는 비율입니다.
              </span>
            </div>
          </div>
        )}
        <input
          id={`file-input-${id}`}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          hidden
        />
        <ButtonContainer>
          <div>
            <Button
              title="템플릿 삭제"
              buttonType="black"
              className="image-upload-delete"
              onClick={handleDeleteImage}
            />
          </div>
        </ButtonContainer>
      </div>
    </ImageContainer>
  );
};

export default ImageItem;
