import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import tw, { styled, css } from 'twin.macro';
import Button from 'components/common/Button';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
const ChallengeWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const CreateForm = styled.div`
  width: 50vw;
`;
const Title = styled.span`
  ${tw`text-[32px]`}
`;
const TitleInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[50vw] h-[40px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const SummaryInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[50vw] h-[150px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ContentInputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg p-1 w-[50vw] h-[260px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;
function ChallengeCreaete() {
  const navigate = useNavigate();
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeSummary, setChallengeSummary] = useState('');
  const [challengeContent, setChallengeContent] = useState('');
  const [challengeStartDate, setChallengeStartDate] = useState('');
  const [challengeEndDate, setChallengeEndDate] = useState('');
  const canclehandler = () => {
    navigate('/admin/challenge');
  };
  const submithandler = () => {
    // 챌린지 등록 api 호출
    const formattedStartDate = dayjs(challengeStartDate).format(
      'YYYY-MM-DDTHH:mm:ss',
    );
    const formattedEndDate = dayjs(challengeEndDate).format(
      'YYYY-MM-DDTHH:mm:ss',
    );
    const post_challenge_admin = async () => {
      try {
        const response = await authApi.post(requests.POST_CHALLENGE_ADMIN(), {
          challengeTitle: challengeTitle,
          challengeContent: challengeContent,
          challengeSummary: challengeSummary,
          challengeStartDate: formattedStartDate,
          challengeEndDate: formattedEndDate,
        });

        return console.log(response.data);
      } catch (error) {
        throw error;
      }
    };
    post_challenge_admin();
    navigate('/admin/challenge');
  };
  return (
    <div className="ml-[279px] flex">
      <ChallengeWrapper>
        <CreateForm>
          <div className="flex justify-between items-center">
            <PageTitle>새 챌린지 등록</PageTitle>
          </div>
          <Title>챌린지 제목</Title>
          <form action="submit">
            <TitleInputContainer
              type="text"
              value={challengeTitle}
              onChange={(e) => setChallengeTitle(e.target.value)}
              name="Challenge Title"
            />
          </form>

          <Title>줄거리 요약</Title>
          <form action="submit">
            <SummaryInputContainer
              type="text"
              value={challengeSummary}
              onChange={(e) => setChallengeSummary(e.target.value)}
              name="Challenge Summary"
            />
          </form>
          <Title>챌린지 내용</Title>
          <form action="submit">
            <ContentInputContainer
              type="text"
              value={challengeContent}
              onChange={(e) => setChallengeContent(e.target.value)}
              name="Challenge Content"
            />
          </form>
          <ButtonContainer>
            <div className="mx-1" onClick={submithandler}>
              <Button title="등록" buttonType="black" className="" />
            </div>
            <div onClick={canclehandler}>
              <Button title="취소" buttonType="black" className="" />
            </div>
          </ButtonContainer>
          <DateTimePicker
            label="챌린지 시작 일자 선택"
            value={challengeStartDate || dayjs()}
            className="w-full"
            onChange={(newValue) => setChallengeStartDate(newValue)}
          />
          <DateTimePicker
            label="챌린지 종료 일자 선택"
            value={challengeEndDate || dayjs()}
            className="w-full"
            onChange={(newValue) => setChallengeEndDate(newValue)}
          />
        </CreateForm>
      </ChallengeWrapper>
    </div>
  );
}

export default ChallengeCreaete;
