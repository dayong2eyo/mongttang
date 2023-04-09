import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import requests from 'api/config';
import { defaultApi, authApi, transactionApi } from 'api/axios';
import { userStore } from 'store/userStore';
import ImageItem from './ImageItem';
import Button from 'components/common/Button';
import SaveBookModal from './SaveBookModal';
import { LocalParking } from '@mui/icons-material';

const BarWrapper = styled.div`
  ${tw`m-0 w-full h-16 flex justify-center items-center`}
`;

const BookContentWrapper = styled.div`
  ${tw`flex justify-center w-full mt-[80px]`}

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #b79f93;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: #ebded3;
    border-radius: 0 10px 10px 0;
  }
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const CreateForm = styled.div`
  ${tw`w-[30vw] m-2`}
  ${css`
    height: calc(100vh - 120px);
  `}
`;
const Title = styled.span`
  ${tw`text-[32px]`}
`;
const TitleInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[30vw] h-[40px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const SummaryInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[30vw] h-[150px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ContentInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[30vw] h-[260px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;

const DrawingForm = styled.div`
  ${tw`w-[50vw] flex-col justify-center overflow-auto overflow-x-hidden`}
  ${css`
    height: calc(90vh);
  `}
`;
function NewBookEditor() {
  const privateKey = localStorage.getItem('privateKey');
  const userId = localStorage.getItem('userId');
  const params = useParams();
  const challengeId = params.challengeId;
  const [bookId, setBookId] = useState('');
  const [pages, setPages] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookSummary, setBookSummary] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [defaultContent, setDefaultContent] = useState('');
  const [defaultSummary, setDefaultSummary] = useState('');
  const [defaultTitle, setDefaultTitle] = useState('');
  const [images, setImages] = useState([{ id: uuidv4(), file: null }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState(
    '동화 작성을 완료하시겠어요? 완료버튼을 누르시면 수정은 불가능합니다.',
  );
  const navigate = useNavigate();
  const onSaveBookClose = () => {
    setWarningMessage(
      '동화 작성을 완료하시겠어요? 완료버튼을 누르시면 수정은 불가능합니다.',
    );
    setIsModalOpen(false);
  };
  useEffect(() => {
    const get_book_edit_detail = async () => {
      try {
        const response = await authApi.get(
          requests.GET_BOOK_EDIT_DETAIL(userId, challengeId),
        );
        setDefaultTitle(response.data.bookEdit.challengeTitle);
        setDefaultSummary(response.data.bookEdit.challengeSummary);
        setDefaultContent(response.data.bookEdit.challengeContent);

        return console.log(response);
      } catch (error) {
        throw error;
      }
    };
    get_book_edit_detail();
  }, []);
  useEffect(() => {
    if (bookId !== '') {
      const nftFormData = new FormData();
      nftFormData.append('privateKey', privateKey);
      nftFormData.append('title', bookTitle);
      nftFormData.append('summary', bookSummary);
      images.forEach((img) => nftFormData.append('images', img.file));
      nftFormData.append('bookId', bookId);
      const post_create_nft = async () => {
        try {
          const response = await transactionApi.post(
            requests.POST_CREATE_NFT(),
            nftFormData,
          );
          console.log(bookId);
          return console.log(response);
        } catch (error) {
          throw error;
        }
      };
      post_create_nft();
      navigate(`/challenge/${challengeId}`);
    }
  }, [bookId]);
  const goToList = () => {
    navigate(`/challenge/${challengeId}`);
  };

  const saveBook = () => {
    if (images.some((img) => img.file === null)) {
      setWarningMessage(
        '이미지를 업로드해 주세요! 혹은 비어있는 템플렛이 있을 수 있습니다!',
      );
      return;
    }
    const formData = new FormData();
    // const nftFormData = new FormData();
    const bookData = {
      challengeId: challengeId,
      bookTitle: bookTitle,
      bookSummary: bookSummary,
      bookContent: bookContent,
      isComplete: 'complete',
    };
    formData.append(
      'BookContent',
      new Blob([JSON.stringify(bookData)], { type: 'application/json' }),
    );
    // nftFormData.append('privateKey', privateKey);
    // nftFormData.append('title', bookTitle);
    // nftFormData.append('summary', bookSummary);
    images.forEach((img) => formData.append('imgList', img.file));
    // images.forEach((img) => nftFormData.append('images', img.file));
    const post_book = async () => {
      try {
        const response = await authApi.post(
          requests.POST_BOOK(userId),
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        setBookId(response.data.bookId);
        return console.log(response);
      } catch (error) {
        throw error;
      }
    };

    // const post_create_nft = async () => {
    //   try {
    //     const response = await transactionApi.post(
    //       requests.POST_CREATE_NFT(),
    //       nftFormData,
    //     );
    //     console.log(bookId);
    //     return console.log(response);
    //   } catch (error) {
    //     throw error;
    //   }
    // };
    post_book();
    // post_create_nft();
  };

  const handleImageSelect = (id, file) => {
    setImages((prevImages) =>
      prevImages.map((img) => (img.id === id ? { ...img, file } : img)),
    );
  };

  const handleAddImage = () => {
    setImages((prevImages) => [...prevImages, { id: uuidv4(), file: null }]);
  };

  const handleDeleteImage = (id) => {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <BookContentWrapper>
        <CreateForm>
          <div className="flex justify-between items-center">
            <PageTitle>동화 만들기</PageTitle>
          </div>
          <Title>제목</Title>
          <form action="submit">
            <TitleInputContainer
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              name="Book Title"
              placeholder={defaultTitle}
            />
          </form>

          <Title>줄거리(가이드라인)</Title>
          <form action="submit">
            <SummaryInputContainer
              type="text"
              value={bookSummary}
              onChange={(e) => setBookSummary(e.target.value)}
              name="Book Summary"
              placeholder={defaultSummary}
            />
          </form>
          <Title>스토리 편집</Title>
          <form action="submit">
            <ContentInputContainer
              type="text"
              value={bookContent}
              onChange={(e) => setBookContent(e.target.value)}
              name="Book Content"
              placeholder={defaultContent}
            />
          </form>
          <ButtonContainer>
            <div className="mx-1">
              <Button
                title="완료하기"
                buttonType="mint"
                className=""
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            <div>
              <Button
                title="목록으로"
                buttonType="mint"
                className=""
                onClick={goToList}
              />
            </div>
          </ButtonContainer>
        </CreateForm>
        <DrawingForm>
          <form onSubmit={handleSubmit}>
            {images.map((image, index) => (
              <div key={image.id}>
                <ImageItem
                  id={image.id}
                  onImageSelect={handleImageSelect}
                  onDeleteImage={handleDeleteImage}
                />
                <BarWrapper>
                  <input
                    value={index + 1}
                    onChange={(e) => {
                      setPages(e.target.value);
                    }}
                    type="range"
                    min={0}
                    max={images.length}
                    className="w-[30vw]"
                  />
                  {Number.parseInt(index + 1) + '/' + images.length}
                </BarWrapper>
              </div>
            ))}
            <ButtonContainer>
              <div>
                <Button
                  title="템플릿 추가"
                  buttonType="black"
                  className="image-upload-delete"
                  onClick={handleAddImage}
                />
              </div>
            </ButtonContainer>
          </form>
        </DrawingForm>
      </BookContentWrapper>
      {isModalOpen ? (
        <SaveBookModal
          onClose={onSaveBookClose}
          saveFunc={saveBook}
          message={warningMessage}
          setMessage={setWarningMessage}
        />
      ) : null}
    </div>
  );
}

export default NewBookEditor;
