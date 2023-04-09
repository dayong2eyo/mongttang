import React, { useState } from 'react';
import FormatDate from 'utils/FormatDate';
import { Link } from 'react-router-dom';

import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import upToggleBtn from '../../assets/icons/upToggle.svg';
import downToggleBtn from '../../assets/icons/downToggle.svg';
import Button from 'components/common/Button';

const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center px-1 py-1`}
`;
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

function AdminNoticeItem({ noticeId, title, content, createdTime }) {
  const [isRead, setIsRead] = useState(true);
  const { year, month, day, hour, minute } = FormatDate(createdTime);

  const readContent = () => {
    setIsRead(!isRead);
  };
  const deleteHandler = () => {
    const delete_notice = async () => {
      try {
        const { data } = await authApi.delete(requests.DELETE_NOTICE(noticeId));
        return console.log(data);
      } catch (error) {
        throw error;
      }
    };
    delete_notice();
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

        <ButtonContainer>
          <Link to={`/admin/notice/edit/${noticeId}`}>
            <div className="mx-1">
              <Button title="수정" buttonType="black" className="" />
            </div>
          </Link>
          <div>
            <Button
              title="삭제"
              buttonType="black"
              className=""
              onClick={deleteHandler}
            />
          </div>
        </ButtonContainer>
      </ContentContainer>
    </div>
  );
}

export default AdminNoticeItem;
