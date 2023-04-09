import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import AdminNoticeItem from './AdminNoticeItem';
import Button from 'components/common/Button';

const NoticeWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const NoticeList = styled.div`
  width: 50vw;
`;
function AdminNotice() {
  const [notices, setNotices] = useState('');
  const pageLimit = 3; //현재 등록된 공지수 / 10?
  // const notice = authApi
  //   .get(requests.GET_NOTICE(pageId, pageLimit))
  //   .then((response) => response.notices.content);

  useEffect(() => {
    const get_notice = async () => {
      try {
        const { data } = await authApi.get(requests.GET_NOTICE());
        // console.log(data);
        setNotices(data.notices);
        return console.log(data.notices);
      } catch (error) {
        throw error;
      }
    };

    get_notice();
  }, []);

  return (
    <div className="ml-[279px] flex">
      <NoticeWrapper>
        <NoticeList>
          <div className="flex justify-between items-center">
            <PageTitle>공지사항</PageTitle>
            <Link to="/admin/notice/create">
              <Button title="작성" buttonType="black" />
            </Link>
          </div>
          {[...notices].map((article) => (
            <AdminNoticeItem
              key={article.noticeId}
              noticeId={article.noticeId}
              title={article.noticeTitle}
              content={article.noticeContent.replace(/\r\n/gi, '<br>')}
              createdTime={article.createdTime}
            />
          ))}
        </NoticeList>
      </NoticeWrapper>
    </div>
  );
}

export default AdminNotice;
