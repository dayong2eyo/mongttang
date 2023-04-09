/**
 * 공지사항 조회 페이지
 *
 *
 */
import React, { useEffect, useState } from 'react';
import requests from 'api/config';
import { authApi } from 'api/axios';

import tw, { styled, css } from 'twin.macro';
import NoticeListItem from './NoticeItem';
import Leaves from 'components/common/Leaves';

const NoticeWrapper = styled.div`
  position: fixed;
  font-family: Pretendard;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const PageTitle = styled.div`
  font-family: GangwonEduAll;
  font-size: 2em;
  font-weight: 700;
`;

const NoticeList = styled.div`
  width: 50vw;
`;

function Notice(pageId) {
  const [notices, setNotices] = useState('');
  const pageLimit = 3; //현재 등록된 공지수 / 10?
  // const notice = authApi
  //   .get(requests.GET_NOTICE(pageId, pageLimit))
  //   .then((response) => response.notices.content);

  useEffect(() => {
    const get_notice = async () => {
      try {
        const { data } = await authApi.get(requests.GET_NOTICE());
        setNotices(data.notices);
      } catch (error) {
        throw error;
      }
    };

    get_notice();
  }, []);

  return (
    <div>
      <div className="header" />
      <div className="leaves">
        <Leaves />
        <NoticeWrapper>
          <NoticeList>
            <PageTitle>공지사항</PageTitle>
            {notices
              ? notices.map((article) => (
                  <NoticeListItem
                    key={article.noticeId}
                    id={article.noticeId}
                    title={article.noticeTitle}
                    content={article.noticeContent.replace(/\r\n/gi, '<br>')}
                    createdTime={article.createdTime}
                  />
                ))
              : null}
          </NoticeList>
        </NoticeWrapper>
      </div>
    </div>
  );
}

export default Notice;
