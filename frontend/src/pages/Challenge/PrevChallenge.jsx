import React, { useEffect, useState } from 'react';

import tw, { styled, css } from 'twin.macro';
import BookShelf from 'components/common/BookShelf';
import prevChallenge from '../../assets/images/prevChallenge.png';

// import { books, prevChallenges } from 'api/data';
import { authApi } from 'api/axios';
import requests from 'api/config';

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center pt-[5%] p-48`}
`;

const CTWrapper = styled.div`
  ${tw`flex justify-center m-0 mb-[2%]`}
`;

function PrevChallenge() {
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

      {prevChallenges
        ? prevChallenges.totalChallenges.map((challenge, idx) => {
            return (
              <div key={idx}>
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
    </BodyContainer>
  );
}

export default PrevChallenge;
