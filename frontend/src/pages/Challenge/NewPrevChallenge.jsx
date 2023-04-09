import React, { useEffect, useState } from 'react';

import tw, { styled, css } from 'twin.macro';
import BookShelf from 'components/common/BookShelf';
import prevChallenge from '../../assets/images/prevChallenge.png';

// import { books, prevChallenges } from 'api/data';
import { authApi } from 'api/axios';
import requests from 'api/config';
import BookList from 'components/common/BookList';
import { Link } from 'react-router-dom';

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-48`}
`;

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mb-[2%]`}
`;

const ChallengeContainer = styled.div`
  ${tw``}
`;

const TitleContainer = styled.div`
  ${tw`flex items-baseline space-x-1`}
`;

const TitleWrapper = styled.p`
  ${tw`text-3xl font-bold py-2`}
`;

const LinkWrapper = styled.div`
  ${tw`flex justify-end`}
`;

function NewPrevChallenge() {
  const [prevChallenges, setPrevChallenges] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await authApi(requests.GET_LAST_CHALLENGES()).then((response) => {
          setPrevChallenges(response.data);
        });
      } catch (error) {}
    };

    getData();
  }, []);

  return (
    <BodyContainer>
      <CTWrapper>
        <img src={prevChallenge} alt="prevChallenge" />
      </CTWrapper>

      <ChallengeContainer>
        {prevChallenges
          ? prevChallenges.totalChallenges.map((challenge, index) => {
              return (
                <div key={index}>
                  <TitleContainer>
                    <TitleWrapper>{challenge.challengeTitle}</TitleWrapper>
                  </TitleContainer>
                  <BookList
                    books={challenge.bookList}
                    width="w-40"
                    height="h-48"
                    fromHome="true"
                  />
                  <LinkWrapper>
                    <Link to={`/challenge/${challenge.challengeId}`}>
                      더 많은 동화 보러가기 →
                    </Link>
                  </LinkWrapper>
                </div>
              );
            })
          : null}
      </ChallengeContainer>
    </BodyContainer>
  );
}

export default NewPrevChallenge;
