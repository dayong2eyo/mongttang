import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import AdminChallengeItem from './AdminChallengeItem';
import Button from 'components/common/Button';

const ChallengeWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const ChallengeList = styled.div`
  width: 50vw;
`;
function AdminChallenge() {
  const pageLimit = 3; //현재 등록된 공지수 / 10?
  const [challenges, setChallenges] = useState('');
  // const notice = authApi
  //   .get(requests.GET_NOTICE(pageId, pageLimit))
  //   .then((response) => response.notices.content);
  useEffect(() => {
    const get_challenge_admin = async () => {
      try {
        const { data } = await authApi.get(requests.GET_CHALLENGE_ADMIN());
        // console.log(data);
        setChallenges(data.challenges);
        return console.log(data);
      } catch (error) {
        throw error;
      }
    };

    get_challenge_admin();
  }, []);

  return (
    <div className="ml-[279px] flex">
      <ChallengeWrapper>
        <ChallengeList>
          <div className="flex justify-between items-center">
            <PageTitle>챌린지 관리</PageTitle>
            <Link to="/admin/challenge/create">
              <Button title="작성" buttonType="black" />
            </Link>
          </div>
          {[...challenges].map((article) => (
            <AdminChallengeItem
              key={article.challengeId}
              challengeId={article.challengeId}
              title={article.challengeTitle}
              content={article.challengeContent.replace(/\r\n/gi, '<br>')}
              createdTime={article.createdTime}
              setChallenges={setChallenges}
            />
          ))}
        </ChallengeList>
      </ChallengeWrapper>
    </div>
  );
}

export default AdminChallenge;
