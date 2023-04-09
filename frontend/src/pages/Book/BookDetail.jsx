import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'components/common/Button';
import Coin from '../../assets/icons/Coin.svg';
import { authApi } from 'api/axios';
import requests from 'api/config';
import CommentForm from 'components/common/CommentForm';
import { userStore } from 'store/userStore';
import LikeButtonFill from 'assets/icons/LikeButtonFill.svg';
import LikeButtonEmpty from 'assets/icons/LikeButtonEmpty.svg';
import ProfileImg from 'components/common/ProfileImg';
import TransactionModal from 'components/common/TransactionModal';
import CommentReportModal from 'components/common/CommentReportModal';
import BookReportModal from './BookReportModal';
const BodyContainer = styled.div`
  ${tw`flex flex-col items-center pt-[5%]`}
`;

const BookInfoContainer = styled.div`
  ${tw`flex w-2/3 space-x-16`}
`;
const BookImgWrapper = styled.div`
  ${tw`w-80 h-96 rounded-lg shadow-lg`}
  ${(props) =>
    css`
      background-image: url(${props.imgSrc});
      background-size: cover;
    `}
`;
const MainInfoContainer = styled.div`
  ${tw`flex w-2/3 flex-col justify-evenly m-0 p-[2%]`}
`;
const TitleContainer = styled.div`
  ${tw`flex justify-between text-3xl pb-[2%]`}
`;
const TitleWrapper = styled.div`
  ${tw`pr-[3%]`}
`;
const ArtistWrapper = styled.div`
  ${tw`flex flex-col justify-end items-center text-sm`}
`;
const ArtistImgWrapper = styled.div``;

const ContentWrapper = styled.div`
  ${tw`text-xl`}
  ${css`
    white-space: pre-line;
  `}
`;
const SubInfoContainer = styled.div`
  ${tw`flex justify-end items-center space-x-1`}
`;
const PriceWrapper = styled.div`
  ${tw`flex items-center`}
`;
const InterestBtnWrapper = styled.div`
  ${tw`w-fit h-[24px] p-1 text-sub-bold bg-btnBlack text-white rounded-full flex justify-center items-center shadow cursor-pointer`}
`;

const LikeWrapper = styled.div`
  ${tw`flex items-center`}
`;

const ServiceContainer = styled.div`
  ${tw`flex justify-end items-center space-x-2 pt-2`}
`;

const LinkWrapper = styled.div`
  ${tw`flex justify-end text-base m-0`}
`;

const PriceImgWrapper = styled.div`
  ${tw`m-0 pr-1`}
`;
const LikesWrapper = styled.div``;
const CommentContainer = styled.div``;

function BookDetail() {
  const params = useParams(); //{ bookId: 27 }
  const bookId = params.bookId;
  const navigate = useNavigate();
  const [book, setBook] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem('userId');
  const [isLiked, setIsLiked] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [commentReportModalOpen, setCommentReportModalOpen] = useState(false);
  const [bookReportModalOpen, setBookReportModalOpen] = useState(false);
  const [reportCommentId, setReportCommentId] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isPaid, setIspaid] = useState(false);

  useEffect(() => {
    authApi.get(requests.GET_PROFILE(userId)).then((res) => {
      res.data.profile.paidBooks?.forEach((book) => {
        if (book.bookId === Number.parseInt(bookId)) {
          setIspaid(true);
        }
      });

      res.data.profile.myBooks?.forEach((book) => {
        if (book.bookId === Number.parseInt(bookId)) {
          setIspaid(true);
        }
      });
    });

    authApi
      .get(requests.GET_BOOK_DETAIL(userId, bookId))
      .then((res) => {
        setBook(res.data.bookDetail);
        setIsLiked(res.data.bookDetail.liked);
        setIsInterested(res.data.bookDetail.interested);
        setIsReported(res.data.bookDetail.isReported);
        // console.log(res.data.bookoDetail);
      })
      .catch(() => {
        navigate('/error/400');
      });
  }, []);
  const onReportModalClose = () => {
    setCommentReportModalOpen(false);
  };
  const onBookReportModalClose = () => {
    setBookReportModalOpen(false);
  };
  const interestBook = () => {
    setIsInterested(true);
    //관심목록 추가 API 호출
    authApi.post(requests.POST_INTEREST(userId, bookId)).then((res) => {});
  };

  const uninterestBook = () => {
    setIsInterested(false);
    //관심목록 제거 API 호출
    authApi.delete(requests.DELETE_INTEREST(userId, bookId)).then((res) => {});
  };

  const likeBook = () => {
    setIsLiked(true);
    //좋아요
    authApi.post(requests.POST_BOOKLIKE(userId, bookId)).then((res) => {
      if (res.data.message === 'success') {
        authApi(requests.GET_BOOK_DETAIL(userId, bookId)).then((res) => {
          setBook(res.data.bookDetail);
          // console.log(res.data.bookDetail);
        });
      }
    });
  };

  const dislikeBook = () => {
    setIsLiked(false);
    //좋아요 취소
    authApi.delete(requests.DELETE_BOOKLIKE(userId, bookId)).then((res) => {
      if (res.data.message === 'success') {
        authApi(requests.GET_BOOK_DETAIL(userId, bookId)).then((res) => {
          setBook(res.data.bookDetail);
          // console.log(res.data.bookDetail);
        });
      }
    });
  };

  const payBook = () => {
    if (isPaid) gotoViewer();
    else setIsOpen(true);
  };

  const gotoViewer = async () => {
    try {
      await authApi(requests.GET_BOOK_AUTH(userId, bookId)).then((res) => {
        navigate(`/books/viewer/${bookId}`);
      });
    } catch (error) {}
  };
  const gotoChallenge = () => {
    navigate(`/challenge/${book.challengeId}`);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <BodyContainer>
      {book ? (
        <BookInfoContainer>
          <BookImgWrapper imgSrc={book.illustPath} onClick={payBook} />
          <MainInfoContainer>
            <TitleContainer>
              <TitleWrapper>{book.bookTitle}</TitleWrapper>
              <ArtistWrapper>
                <ArtistImgWrapper>
                  <ProfileImg
                    userId={book.artistId}
                    userImg={book.artistProfileImg}
                  />
                </ArtistImgWrapper>
                {book.artistNickname}
              </ArtistWrapper>
            </TitleContainer>
            <ContentWrapper>{book.bookSummary}</ContentWrapper>
            <SubInfoContainer>
              <PriceWrapper>
                <PriceImgWrapper>
                  <img src={Coin} alt="coin" />
                </PriceImgWrapper>
                {book.price}
              </PriceWrapper>
              <LikeWrapper>
                {!isLiked ? (
                  <button onClick={likeBook}>
                    <img src={LikeButtonEmpty} alt="" />
                  </button>
                ) : (
                  <button onClick={dislikeBook}>
                    <img src={LikeButtonFill} alt="" />
                  </button>
                )}
              </LikeWrapper>
              <LikesWrapper>{book.numOfLike}</LikesWrapper>
              <InterestBtnWrapper>
                {!isReported ? (
                  <button
                    onClick={() => {
                      setBookReportModalOpen(true);
                    }}
                  >
                    신고
                  </button>
                ) : (
                  <button>이미 신고한 동화입니다</button>
                )}
              </InterestBtnWrapper>
            </SubInfoContainer>
            <ServiceContainer>
              <InterestBtnWrapper>
                {!isInterested ? (
                  <button onClick={interestBook}>관심목록 추가</button>
                ) : (
                  <button onClick={uninterestBook}>관심 취소</button>
                )}
              </InterestBtnWrapper>

              <LinkWrapper>
                <Button
                  title="이번 시즌 챌린지로 →"
                  buttonType="mint"
                  onClick={gotoChallenge}
                />
              </LinkWrapper>
              <LinkWrapper>
                <Button
                  title="동화 보러가기 →"
                  buttonType="mint"
                  onClick={payBook}
                />
              </LinkWrapper>
            </ServiceContainer>
          </MainInfoContainer>
        </BookInfoContainer>
      ) : null}
      {book ? (
        <CommentContainer>
          <CommentForm
            bookComments={book.comments}
            setReportCommentId={setReportCommentId}
            setCommentReportModalOpen={setCommentReportModalOpen}
          />
        </CommentContainer>
      ) : null}

      {bookReportModalOpen ? (
        <BookReportModal onClose={onBookReportModalClose} bookId={bookId} />
      ) : null}

      {isOpen ? (
        <TransactionModal
          bookId={bookId}
          bookPrice={book.price}
          tokenId={book.nftId}
          onClose={onClose}
        />
      ) : null}
    </BodyContainer>
  );
}

export default BookDetail;
