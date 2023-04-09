import React from 'react';
import tw, { styled, css } from 'twin.macro';
import bookshelf from '../../assets/images/Shelf.svg';
import BookList from './BookList';
import BookListItem from './BookListItem';
import ChallengeInfo from './ChallengeInfo';

import shelf from '../../assets/images/Shelf.svg';

const ShelfSize = {
  'b-5': 'flex items-center absolute bottom-5', //p-48기준(선반이 2/3가량만 차게 할 경우)
  'b-12': 'flex items-center absolute bottom-12', //p-48기준(선반이 2/3가량만 차게 할 경우)
  'b-16': 'flex items-center absolute bottom-16', //p-0기준(선반이 화면에 꽉 차게 할 경우)
};

const ShelfContainer = styled.div`
  ${tw`relative mt-[20%]`}
`;

const ChallengeContainer = styled.div`
  ${tw`flex flex-wrap justify-around`}
`;

const ShelfWrapper = styled.div`
  ${tw``}
`;

function BookShelf({ books, width, height, size }) {
  return (
    <ShelfContainer>
      <ChallengeContainer>
        <div className={`${ShelfSize[size]}`}>
          {books.map((book, index) => {
            return (
              <BookListItem
                key={index}
                book={book}
                width={width}
                height={height}
              />
            );
          })}
        </div>
        <ShelfWrapper>
          <img src={shelf} alt="shelf" />
        </ShelfWrapper>
      </ChallengeContainer>
    </ShelfContainer>
  );
}

export default BookShelf;
