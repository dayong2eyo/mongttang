import React from 'react';

import tw, { styled, css } from 'twin.macro';

//Components
import NavBar from 'components/common/NavBar';
import Modal from 'components/common/Modal';
import ProfileImg from 'components/common/ProfileImg';
import ChallengeTimer from 'components/common/ChallengeTimer';
import BookShelf from 'components/common/BookShelf';

import thisChallenge from '../../assets/images/thisChallenge.png';
import requests from 'api/config';
import { authApi, defaultApi } from 'api/axios';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mt-[2%]`}
`;

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-48`}
`;

const ChallengeContainer = styled.div`
  ${tw`pt-[10%]`}
`;

function Home() {
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

  // console.log(challenges);
  return (
    <div>
      <BodyContainer>
        <CTWrapper>
          <img src={thisChallenge} alt="thisChallenge" />
        </CTWrapper>
        {challenges ? (
          <ChallengeTimer
            endDate={challenges.thisWeekChallenge[0].challengeEndDate}
          />
        ) : null}
        <ChallengeContainer>
          {challenges
            ? challenges.thisWeekChallenge.map((challenge, index) => {
                return (
                  <div key={index}>
                    <BookShelf
                      books={challenge.bookList}
                      width="w-40"
                      height="h-48"
                      challenge={challenge}
                      size="b-5"
                    />
                  </div>
                );
              })
            : null}
        </ChallengeContainer>
      </BodyContainer>
    </div>
  );
}

export default Home;
