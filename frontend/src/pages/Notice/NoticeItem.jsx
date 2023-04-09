import React, { useEffect, useState } from 'react';
import FormatDate from 'utils/FormatDate';

import tw, { styled, css } from 'twin.macro';
import upToggleBtn from '../../assets/icons/upToggle.svg';
import downToggleBtn from '../../assets/icons/downToggle.svg';
import Button from 'components/common/Button';
import { authApi } from 'api/axios';
import requests from 'api/config';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 700;
`;
const Time = styled.div`
  display: block;
  font-size: 15px;
  font-weight: 200;
`;
const ToggleButton = styled.button`
  margin-top: 16px;
  display: inline-block;
  width: 20px;
  height: 20px;
  outline: none;
`;

const ContentContainer = styled.div`
  background-color: #d6d3cd;
`;
const Content = styled.section`
  font-family: Pretendard;
  font-size: 15px;
  background-color: #d6d3cd;
  white-space: pre-line;
  padding: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
`;

function NoticeListItem({ title, id, content, createdTime }) {
  const [isRead, setIsRead] = useState(true);

  const { year, month, day, hour, minute } = FormatDate(createdTime);

  const readContent = () => {
    setIsRead(!isRead);
  };

  return (
    <div>
      <hr />
      <TitleContainer onClick={readContent}>
        <Title>{title}</Title>
        <ToggleButton>
          {isRead ? (
            <img src={downToggleBtn} alt="" />
          ) : (
            <img src={upToggleBtn} alt="" />
          )}
        </ToggleButton>
      </TitleContainer>
      <Time>
        {year}-{month}-{day} {hour}:{minute}
      </Time>

      <ContentContainer className={`${isRead === true ? 'hidden' : ''}`}>
        {isRead ? '' : <Content>{content}</Content>}
      </ContentContainer>
    </div>
  );
}

export default NoticeListItem;
