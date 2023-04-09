/**
 * 메인화면 및 챌린지화면에 들어갈 동화 상세로 이어질 컴포넌트
 */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import BookInfo from './BookInfo';

const BookListItemWrapper = styled.div`
  ${tw`px-2`}
`;

const BookImage = styled.img`
  ${tw`border-b-2 border-r-4 border-gray-400 z-0 absolute transition rounded-lg duration-300 shadow-lg ease-in-out hover:opacity-20 hover:scale-110`}
  ${(props) =>
    css`
      background-image: url(${props.imgSrc});
      background-size: contain;
    `}
`;

const BookInfoWrapper = styled.div`
  ${tw`z-50`}
`;

function BookListItem({ width, height, book, incomplete }) {
  const userId = localStorage.getItem('userId');
  const [incompleted, setIncompleted] = useState(false);
  const [isHover, setIsHover] = useState(false); //마우스가 올라가있는지
  useEffect(() => {
    setIncompleted(incomplete);
  });
  const navigate = useNavigate();

  const handleHover = (props) => {
    setTimeout(() => {
      setIsHover(props);
    }, 100);
  };

  return (
    <BookListItemWrapper>
      <BookImage
        onMouseOver={() => handleHover(true)}
        onMouseOut={() => handleHover(false)}
        onClick={() => navigate(`/books/${userId}/${book.bookId}`)}
        src={book.bookImgUrl}
        className={`image-upload-preview ${width} ${height}`}
        alt="upload-preview"
      />

      <BookInfoWrapper>
        <BookInfo
          title={book.bookTitle}
          artist={book.artistNickname}
          profileImgURL={book.profileImgURL}
          artistId={book.artistId}
          likes={book.numOfLike}
          comments={book.numOfComment}
          width={width}
          height={height}
        />
      </BookInfoWrapper>
    </BookListItemWrapper>
  );
}

export default BookListItem;
