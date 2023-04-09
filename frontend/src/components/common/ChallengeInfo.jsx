import React from 'react';
import { Link } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import challengeBg from '../../assets/images/challengeInfo.svg';

const Challenge = styled.div`
  ${tw`relative top-2`}
`;

const ImageWrapper = styled.div`
  ${tw`w-3/4 h-3/4`}
`;

const TextContainer = styled.div`
  ${tw`w-3/4 absolute p-1 px-3`}
`;

const TextWrapper = styled.div`
  ${tw`h-28 overflow-hidden `}
`;

const TitleWrapper = styled.p`
  ${tw`text-xl`}
`;
const ContentWrapper = styled.p`
  ${tw`text-sm m-0.5`}
`;
const LinkWrapper = styled.div`
  ${tw`text-right text-sm`}
`;

function ChallengeInfo({ challenge }) {
  const title = challenge.challengeTitle;
  const content = challenge.challengeContent;
  const summary = challenge.challengeSummary;

  //챌린지 번호
  const challengeId = challenge.challengeId;

  return (
    <Link to={`/challenge/${challengeId}`}>
      <Challenge>
        <TextContainer>
          <TextWrapper>
            <TitleWrapper>{title}</TitleWrapper>
            <ContentWrapper>{summary}</ContentWrapper>
          </TextWrapper>
        </TextContainer>
        <ImageWrapper>
          <img src={challengeBg} alt="challengeImg" />
        </ImageWrapper>
      </Challenge>
    </Link>
  );
}

export default ChallengeInfo;
