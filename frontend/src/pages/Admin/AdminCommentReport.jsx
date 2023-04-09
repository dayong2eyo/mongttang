import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import AdminCommentReportItem from './AdminCommentReportItem';

const ReportWrapper = styled.div`
  ${tw`flex justify-center w-full mt-10`}
`;

const PageTitle = styled.div`
  ${tw`text-[48px]`}
`;

const ReportList = styled.div`
  width: 70vw;
`;
function AdminCommentReport() {
  const pageLimit = 3; //현재 등록된 공지수 / 10?
  const [commentReports, setCommentReports] = useState('');

  useEffect(() => {
    const get_report_comment = async () => {
      try {
        const { data } = await authApi.get(requests.GET_REPORT_COMMENT());
        // console.log(data);
        setCommentReports(data.commentreports);
        return console.log(data.commentreports);
      } catch (error) {
        throw error;
      }
    };

    get_report_comment();
  }, []);

  return (
    <div className="ml-[279px] flex">
      <ReportWrapper>
        <ReportList>
          <div className="flex justify-between items-center">
            <PageTitle>댓글 신고내역</PageTitle>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    댓글 내용
                  </th>
                  <th
                    scope="col"
                    className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    카테고리
                  </th>
                  <th
                    scope="col"
                    className="w-2/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    내용
                  </th>
                  <th
                    scope="col"
                    className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    신고인
                  </th>
                  <th
                    scope="col"
                    className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    관리
                  </th>
                </tr>
              </thead>

              {[...commentReports].map((article) => (
                <AdminCommentReportItem
                  key={article.commentId}
                  commentId={article.commentId}
                  commentContent={article.commentContent}
                  content={article.reportContent.replace(/\r\n/gi, '<br>')}
                  category={article.reportCategory}
                  reporterNickname={article.reporterNickname}
                />
              ))}
            </table>
          </div>
        </ReportList>
      </ReportWrapper>
    </div>
  );
}

export default AdminCommentReport;
