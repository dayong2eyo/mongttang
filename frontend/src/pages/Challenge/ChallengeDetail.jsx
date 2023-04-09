import React from 'react';
import tw, { styled, css } from 'twin.macro';

import { authApi } from 'api/axios';
// import { challengeDetails } from 'api/data';
import requests from 'api/config';
import { Link, useParams } from 'react-router-dom';
import Button from 'components/common/Button';
import { useState } from 'react';
import { useEffect } from 'react';
import BookListItem from 'components/common/BookListItem';
import BookBadge from 'components/common/BookBadge';
import BookShelf from 'components/common/BookShelf';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const BodyContainer = styled.div`
  ${tw`flex flex-col items-center pt-[5%]`}
`;

const BookTitleContainer = styled.div`
  ${tw`flex items-baseline`}
`;

const BookTitleWrapper = styled.p`
  ${tw`text-3xl pl-[2%] pt-[5%] whitespace-nowrap`}
`;
const ChallengeInfoContainer = styled.div`
  ${tw`flex flex-col flex-wrap w-2/3`}
`;
const BookContainer = styled.div`
  ${tw`p-48 pt-8`}
`;
const BestBookContainer = styled.div`
  ${tw`flex items-center justify-center`}
`;
const RecentBookContainer = styled.div`
  ${tw`flex flex-wrap`}
`;

const TitleWrapper = styled.p`
  ${tw`text-5xl m-0 pb-2 pt-[10%]`}
`;
const ContentWrapper = styled.p`
  ${tw`text-2xl m-0`}
`;
const LinkWrapper = styled.div`
  ${tw`flex justify-end text-base m-0`}
`;

function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

function ChallengeDetail({ searchKeyword }) {
  const [challengeDetails, setChallengeDetails] = useState();
  const [challengeInfo, setChallengeInfo] = useState();
  const [books, setBooks] = useState('');
  const userId = localStorage.getItem('userId');
  const params = useParams();
  const id = params.challengeId;

  const [sort, setSort] = useState('lates');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await authApi(requests.GET_CHALLENGE(id)).then((response) => {
          setChallengeDetails(response.data);
          if (books === '') setBooks(response.data.recent);
        });

        //url의 challengeId를 바탕으로 해당 challege에 대한 정보를 가져온다
        await authApi(requests.GET_CHALLENGES()).then((response) =>
          response.data.thisWeekChallenge.map((challenge) => {
            if (challenge.challengeId === Number.parseInt(id)) {
              setChallengeInfo(challenge);
            }
          }),
        );

        //정렬기준 재설정
        await authApi(requests.GET_BOOK_ORDER(id, sort)).then((response) => {
          if (response.status === 200) {
            setBooks(response.data.detailChallenges);
          }
        });
      } catch (error) {}
    };
    getData();
  }, [sort]);

  //검색어에 따른 필터링
  useEffect(() => {
    if (searchKeyword !== '') {
      authApi(requests.GET_CHALLENGE(id)).then((response) => {
        // setChallengeDetails(response.data);
        const result = response.data.recent;
        const filteredBooks = result.filter((book) =>
          book.bookTitle.includes(searchKeyword),
        );
        setBooks(filteredBooks);
      });
    } else {
      authApi(requests.GET_CHALLENGE(id)).then((response) => {
        setBooks(response.data.recent);
      });
    }
  }, [searchKeyword]);

  const chunkedBooks = chunkArray(books, 5);

  return (
    <BodyContainer>
      {challengeDetails ? (
        <ChallengeInfoContainer>
          <TitleWrapper>
            {challengeDetails.detailChallenge.challengeTitle}
          </TitleWrapper>
          <ContentWrapper>
            {challengeDetails.detailChallenge.challengeSummary}
          </ContentWrapper>
          <LinkWrapper>
            {challengeInfo && userId ? (
              <Link to={`/newbook/${id}/${userId}`}>
                <Button title="동화 만들기 →" buttonType="mint" />
              </Link>
            ) : null}
          </LinkWrapper>
        </ChallengeInfoContainer>
      ) : null}
      {challengeDetails ? (
        <BookContainer>
          <BestBookContainer>
            {challengeDetails.detailChallenge.bookList[1] ? (
              <BookBadge
                book={challengeDetails.detailChallenge.bookList[1]}
                key={challengeDetails.detailChallenge.bookList[1].bookId}
                index={1}
              >
                <BookListItem
                  book={challengeDetails.detailChallenge.bookList[1]}
                  width="w-40"
                  height="h-48"
                />
              </BookBadge>
            ) : null}
            {challengeDetails.detailChallenge.bookList[0] ? (
              <BookBadge
                book={challengeDetails.detailChallenge.bookList[0]}
                key={challengeDetails.detailChallenge.bookList[0].bookId}
                index={0}
              >
                <BookListItem
                  book={challengeDetails.detailChallenge.bookList[0]}
                  width="w-60"
                  height="h-72"
                />
              </BookBadge>
            ) : null}
            {challengeDetails.detailChallenge.bookList[2] ? (
              <BookBadge
                book={challengeDetails.detailChallenge.bookList[2]}
                key={challengeDetails.detailChallenge.bookList[2].bookId}
                index={2}
              >
                <BookListItem
                  book={challengeDetails.detailChallenge.bookList[2]}
                  width="w-40"
                  height="h-48"
                />
              </BookBadge>
            ) : null}
          </BestBookContainer>
          <BookTitleContainer>
            <BookTitleWrapper>관련 동화</BookTitleWrapper>
            <FormControl
              sx={{ m: 1, minWidth: 80, fontSize: '10px' }}
              size="small"
            >
              <InputLabel id="demo-select-small">정렬</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={sort}
                label="Sort"
                onChange={handleChange}
              >
                <MenuItem value="lates">최신순</MenuItem>
                <MenuItem value="like">좋아요순</MenuItem>
                <MenuItem value="view">조회순</MenuItem>
              </Select>
            </FormControl>
          </BookTitleContainer>

          <RecentBookContainer>
            {chunkedBooks.map((chunkedBook, index) => {
              return (
                <BookShelf
                  key={index}
                  books={chunkedBook}
                  width="w-40"
                  height="h-48"
                  size="b-16"
                />
              );
            })}
          </RecentBookContainer>
        </BookContainer>
      ) : null}
    </BodyContainer>
  );
}

export default ChallengeDetail;
