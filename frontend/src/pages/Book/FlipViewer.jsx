import React, { useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../../assets/slick-theme.css';
import '../../assets/slick.css';
import '../../components/common/Leaves.css';

import BeforePage from '../../assets/icons/BeforePage.svg';
import NextPage from '../../assets/icons/NextPage.svg';
import tw, { styled, css } from 'twin.macro';
import { authApi } from 'api/axios';
import requests from 'api/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback } from 'react';

import BookmarkBtn from '../../assets/icons/Bookmark.svg';
import LikeBtnFill from '../../assets/icons/LikeButtonFill.svg';
import LikeBtnEmpty from '../../assets/icons/LikeButtonEmpty.svg';
import CloseBtn from '../../assets/icons/CloseApp.svg';
import FirstPageBtn from '../../assets/icons/GotoFirst.svg';
import ProfileImg from 'components/common/ProfileImg';

// import { bookImg } from 'api/data';

const PageContainer = styled.div`
  ${tw`flex h-[100vh] flex-col overflow-hidden`};
`;

const ViewContainer = styled.div`
  ${tw`w-full h-full flex justify-center`}
`;
const PageWrapper = styled.div`
  // ${tw``}
`;
const TitleContainer = styled.div`
  ${tw`flex justify-between items-center space-x-2 text-xl`}
`;
const TitleWrapper = styled.div``;
const ArtistWrapper = styled.div`
  ${tw`flex`}
`;
const ArtistImgWrapper = styled.div``;

const BarWrapper = styled.div`
  ${tw`m-0 fixed bottom-0 w-2/3 h-16 flex justify-center items-center`}
`;

const BtnContainer = styled.div`
  ${tw`flex ml-[70%] space-x-1 fixed `}
`;
const BtnWrapper = styled.div`
  ${tw`z-50 h-[24px] p-1 pr-10 bg-btnBlack rounded-full shadow cursor-pointer`}
`;

const PageHeader = styled.div`
  ${tw`flex justify-center w-full h-16 bg-white border-b-4 m-0 p-0 opacity-100`}
`;
const PageFooter = styled.div`
  ${tw`flex justify-center w-full bg-white border-t-4 h-20 mt-2 opacity-100`}
`;

function FlipViewer() {
  const [bookImg, setBookImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState();

  const [bookTitle, setBookTitle] = useState();
  const [artistNickname, setArtistNickname] = useState();
  const [artistProfileImg, setArtistProfileImg] = useState();
  const bookRef = useRef(null);

  const params = useParams();
  const bookId = params.bookId;
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const onFlip = useCallback((e) => {
    setCurrentPage(Number.parseInt(e.data));
  }, []);

  const onInit = useCallback((e) => {
    setCurrentPage(bookRef.current.pageFlip().getCurrentPageIndex());
    const dir = bookRef.current.pageFlip().getPageCount();
    setAllPage(dir);
  }, []);

  const handleFlipNext = () => {
    bookRef.current.pageFlip().flipNext();
  };
  const handleFlipPrev = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  const turnPage = (e) => {
    bookRef.current.pageFlip().turnToPage(Number.parseInt(e));
  };

  const [isLiked, setIsLiked] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  const interestBook = async () => {
    setIsInterested(!isInterested);
    //관심목록 추가 API 호출
    try {
      if (isInterested === true) {
        await authApi
          .post(requests.POST_INTEREST(userId, bookId))
          .then((res) => {
            if (res.data.message === 'success') {
              alert('관심목록에 추가되었습니다');
            }
          });
      } else {
        await authApi
          .delete(requests.DELETE_INTEREST(userId, bookId))
          .then((res) => {
            if (res.data.message === 'success') {
              alert('관심목록에서 제거되었습니다');
            }
          });
      }
    } catch (error) {}
  };

  const likeBook = () => {
    setIsLiked(true);
    //좋아요
    authApi.post(requests.POST_BOOKLIKE(userId, bookId)).then((res) => {
      if (res.data.message === 'success') {
      }
    });
  };

  const dislikeBook = () => {
    setIsLiked(false);
    //좋아요 취소
    authApi.delete(requests.DELETE_BOOKLIKE(userId, bookId)).then((res) => {
      if (res.data.message === 'success') {
      }
    });
  };

  const closeApp = () => {
    navigate(`/books/${userId}/${bookId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      authApi.get(requests.GET_BOOK_IMAGES(bookId)).then((res) => {
        setBookImg(res.data.illustes);
      });

      await authApi
        .get(requests.GET_BOOK_DETAIL(userId, bookId))
        .then((res) => {
          setIsLiked(res.data.bookDetail.liked);
          setBookTitle(res.data.bookDetail.bookTitle);
          setArtistNickname(res.data.bookDetail.artistNickname);
          setArtistProfileImg(res.data.bookDetail.artistProfileImg);
        });
    };

    fetchData();
  }, []);

  return (
    <PageContainer>
      <PageHeader>
        <TitleContainer>
          <TitleWrapper>{bookTitle}</TitleWrapper>
        </TitleContainer>
      </PageHeader>
      <ViewContainer>
        <button onClick={handleFlipPrev} style={{ paddingRight: 90 }}>
          <img src={BeforePage} alt="beforePage" width="50%" />
        </button>
        <HTMLFlipBook
          width={window.innerWidth * 0.3}
          height={window.innerWidth * 0.4}
          ref={bookRef}
          usePortrait={true}
          onFlip={onFlip}
          onInit={onInit}
          showCover={true}
          style={{
            boxShadow: '10px 12px 5px 1px rgba(0, 0, 0, 0.5)',
            borderRadius: '5px 5px 5px 10px',
          }}
        >
          {bookImg &&
            bookImg.map((img) => (
              <img
                key={img.pageNo}
                src={img.illustePath}
                width={bookRef.current.width}
                height={bookRef.current.height}
                alt="page"
              />
            ))}
        </HTMLFlipBook>
        <button onClick={handleFlipNext} style={{ paddingLeft: 90 }}>
          <img src={NextPage} alt="nextPage" width="50%" />
        </button>
      </ViewContainer>
      <PageFooter>
        {bookImg !== undefined ? (
          <BarWrapper>
            <input
              onChange={(e) => {
                turnPage(e.target.value);
                setCurrentPage(e.target.value);
              }}
              value={currentPage}
              type="range"
              min={0}
              max={allPage - 1}
              style={{
                width: '50vw',
              }}
            />
            {Number.parseInt(currentPage) + 1 + '/' + allPage}
          </BarWrapper>
        ) : null}
        <BtnContainer>
          <button
            style={{
              width: 30,
              height: 40,
              zIndex: 50,
              marginTop: 10,
            }}
            onClick={() => turnPage(0)}
          >
            <img src={FirstPageBtn} alt="처음으로" />
          </button>
          <button
            style={{
              width: 30,
              height: 40,
              zIndex: 50,
              marginTop: 10,
            }}
            onClick={interestBook}
          >
            <img src={BookmarkBtn} alt="관심목록 추가" />
          </button>
          {isLiked ? (
            <button
              style={{
                width: 30,
                height: 40,
                zIndex: 50,
                marginTop: 10,
              }}
              onClick={dislikeBook}
            >
              <img src={LikeBtnFill} alt="좋아요" />
            </button>
          ) : (
            <button
              style={{
                width: 30,
                height: 40,
                zIndex: 50,
                marginTop: 10,
              }}
              onClick={likeBook}
            >
              <img src={LikeBtnEmpty} alt="좋아요" />
            </button>
          )}
          <button
            style={{
              width: 30,
              height: 40,
              zIndex: 50,
              marginTop: 10,
            }}
            onClick={closeApp}
          >
            <img src={CloseBtn} alt="닫기" />
          </button>
        </BtnContainer>
      </PageFooter>
    </PageContainer>
  );
}

export default FlipViewer;
