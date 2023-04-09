import React from 'react';

import tw, { styled, css } from 'twin.macro';

//Components
import ChallengeTimer from 'components/common/ChallengeTimer';

import title from '../../assets/images/title.png';
import thisChallenge from '../../assets/images/thisChallenge.png';
import requests from 'api/config';
import { authApi } from 'api/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import BookList from 'components/common/BookList';
import { Link } from 'react-router-dom';
import BookSwiper from 'components/common/BookSwiper';

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 my-[2%]`}
`;

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-[13%]`}
`;

const DiscountContainer = styled.div`
  ${tw`pt-[2%]`}
`;

const ChallengeContainer = styled.div`
  ${tw`pt-[10%]`}
`;

const TitleContainer = styled.div`
  ${tw`flex items-baseline space-x-1`}
`;

const TitleWrapper = styled.p`
  ${tw`text-3xl font-extrabold py-2`}
`;

const LinkWrapper = styled.div`
  ${tw`flex justify-end`}
`;

function NewHome() {
  const [challenges, setChallenges] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        await authApi(requests.GET_CHALLENGES()).then((response) => {
          setChallenges(response.data);
        });
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <div>
      <BodyContainer>
        <CTWrapper>
          <img src={title} alt="thisChallenge" />
        </CTWrapper>
        {challenges ? (
          <ChallengeTimer
            endDate={challenges.thisWeekChallenge[0].challengeEndDate}
          />
        ) : null}
        <DiscountContainer>
          <TitleContainer>
            <TitleWrapper>50% 할인 동화</TitleWrapper>
          </TitleContainer>
          {challenges ? (
            <BookSwiper
              books={challenges.discountBooks}
              // books={challenges.thisWeekChallenge[0].bookList}
              width="w-40"
              height="h-48"
            />
          ) : null}
        </DiscountContainer>
        <ChallengeContainer>
          {challenges
            ? challenges.thisWeekChallenge.map((challenge, index) => {
                // console.log(challenge);
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
    </div>
  );
}

export default NewHome;
