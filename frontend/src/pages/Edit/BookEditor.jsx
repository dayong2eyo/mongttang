import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';
import ImageItem from './ImageItem';
import Button from 'components/common/Button';

const BarWrapper = styled.div`
  ${tw`m-0 w-full h-16 flex justify-center items-center`}
`;

const BookContentWrapper = styled.div`
  ${tw`flex justify-center w-full mt-[80px]`}
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
  ${tw`w-[50vw] flex-col justify-center overflow-auto`}
  ${css`
    height: calc(100vh - 120px);
  `}
`;
function BookEditor() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const params = useParams();
  const bookId = params.bookId;
  const [challengeId, setChallengeId] = useState('');

  const [pages, setPages] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookSummary, setBookSummary] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [images, setImages] = useState([{ id: uuidv4(), file: null }]);
  const [illusts, setIllusts] = useState([]);
  useEffect(() => {
    const get_book_detail_edit = async () => {
      try {
        const response = await authApi.get(
          requests.GET_BOOK_DETAIL_EDIT(userId, bookId),
        );
        setBookContent(response.data.bookEdit.bookContent);
        setBookSummary(response.data.bookEdit.bookSummary);
        setChallengeId(response.data.bookEdit.challengeId);
        setBookTitle(response.data.bookEdit.bookTitle);
        setIllusts(response.data.bookEdit.illusts);
        console.log(illusts);

        return console.log(response.data.bookEdit);
      } catch (error) {
        throw error;
      }
    };
    get_book_detail_edit();
    for (let i = 0; i < illusts.length; i++) {
      let illustePath = illusts[i].illustePath;
    }
  }, [bookId, userId]);

  const goToList = () => {
    navigate(`/challenge/${bookId}`);
  };
  const tempSaveBook = () => {
    const formData = new FormData();
    const bookData = {
      challengeId: challengeId,
      bookTitle: bookTitle,
      bookSummary: bookSummary,
      bookContent: bookContent,
      isComplete: 'temporary',
    };
    formData.append(
      'BookContent',
      new Blob([JSON.stringify(bookData)], { type: 'application/json' }),
    );

    images.forEach((img) => {
      formData.append('imgList', img.file);
    });
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

        return console.log(response);
      } catch (error) {
        throw error;
      }
    };
    post_book();
  };
  const saveBook = () => {
    const formData = new FormData();
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

    images.forEach((img) => formData.append('imgList', img.file));
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

        return console.log(response);
      } catch (error) {
        throw error;
      }
    };
    post_book();
  };
  // const deleteBook = () => {
  //   const post_book = async () => {
  //     try {
  //       const response = await authApi.delete(
  //         requests.DELETE_BOOK_TEMP(userId),
  //         {
  //           bookId: bookId,
  //         },
  //       );

  //       return console.log(response);
  //     } catch (error) {
  //       throw error;
  //     }
  //   };
  //   post_book();
  // };
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
            />
          </form>

          <Title>줄거리(가이드라인)</Title>
          <form action="submit">
            <SummaryInputContainer
              type="text"
              value={bookSummary}
              onChange={(e) => setBookSummary(e.target.value)}
              name="Book Summary"
            />
          </form>
          <Title>스토리 편집</Title>
          <form action="submit">
            <ContentInputContainer
              type="text"
              value={bookContent}
              onChange={(e) => setBookContent(e.target.value)}
              name="Book Content"
            />
          </form>
          <ButtonContainer>
            <div className="mx-1">
              <Button
                title="삭제하기"
                buttonType="mint"
                className=""
                onClick={goToList}
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
          <ButtonContainer>
            <div className="mx-1">
              <Button
                title="임시저장"
                buttonType="mint"
                className=""
                onClick={tempSaveBook}
              />
            </div>
            <div>
              <Button
                title="완료하기"
                buttonType="mint"
                className=""
                onClick={saveBook}
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
            <button type="submit">Submit</button>
          </form>
        </DrawingForm>
      </BookContentWrapper>
    </div>
  );
}

export default BookEditor;
