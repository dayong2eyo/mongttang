import React from 'react';
import BookListItem from './BookListItem';
import tw, { styled, css } from 'twin.macro';
import BookBadge from './BookBadge';
import BookIndex from './BookIndex';

const BookListWrapper = styled.div`
  ${tw`flex flex-wrap py-2`}
`;

const BookItemContainer = styled.div`
  ${tw`flex flex-col items-center mr-2`}
`;
const FirstItemContainer = styled.div`
  ${tw`flex flex-row h-80 space-x-2 p-2 items-center`}
`;

function BookList({ width, height, books, fromHome }) {
  if (books.length === 0) {
    return <p>책 내역이 없습니다.</p>;
  }

  //내림차순 정렬(높은것부터 앞으로 오도록)
  books.sort((a, b) => {
    return b.total - a.total;
  });

  return (
    <BookListWrapper>
      {books
        ? books.map((book, index) => {
            if (index === 0 && fromHome) {
              return (
                <FirstItemContainer key={book.bookId}>
                  <BookBadge book={book} index={index}>
                    <BookListItem book={book} width="w-64" height="h-80" />
                  </BookBadge>
                  <BookIndex book={book} margin="10px" />
                </FirstItemContainer>
              );
            } else {
              return (
                <BookItemContainer key={book.bookId}>
                  <BookBadge book={book} index={index}>
                    <BookListItem book={book} width={width} height={height} />
                  </BookBadge>
                  <BookIndex book={book} margin={0} />
                </BookItemContainer>
              );
            }
          })
        : ''}
    </BookListWrapper>
  );
}

export default BookList;
