import React from 'react';
import Modal from 'components/common/Modal';
import requests from 'api/config';
import { authApi } from 'api/axios';
import tw, { styled, css } from 'twin.macro';
import { useState } from 'react';

const ContentContainer = styled.div`
  ${tw`m-4 font-bold`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex flex-row m-1 mt-2 space-x-2 justify-around border-none text-sm`}
`;

function CommentReportModal({ onClose, reportCommentId }) {
  const userId = localStorage.getItem('userId');
  const [reason, setReason] = useState('');
  const [reasonDetail, setReasonDetail] = useState('');
  const onReason = (e) => {
    setReason(e.target.value);
  };
  const onContent = (e) => {
    setReasonDetail(e.currentTarget.value);
  };

  const submitHandler = () => {
    const post_report_comment = async () => {
      try {
        await authApi.post(
          requests.POST_REPORT_COMMENT(userId, reportCommentId),
          {
            reportContent: reasonDetail,
            reportCategory: reason,
          },
        );
      } catch (error) {
        throw error;
      }
    };
    post_report_comment();
    onClose();
  };
  return (
    <Modal onClose={onClose}>
      <ContentContainer>신고사유</ContentContainer>
      <hr />
      <div>
        <div>
          <input
            type="radio"
            value="욕설 및 비방"
            name="reason"
            onClick={onReason}
          />
          욕설 및 비방
        </div>
        <br />
        <div>
          <input
            type="radio"
            value="상업성 스팸 및 홍보"
            name="reason"
            onClick={onReason}
          />
          상업성 스팸 및 홍보
        </div>
        <br />
        <div>
          <input type="radio" value="성희롱" name="reason" onClick={onReason} />
          성희롱
        </div>
        <br />
        <div>
          <input
            type="radio"
            value="불쾌한 표현"
            name="reason"
            onClick={onReason}
          />
          불쾌한 표현
        </div>
        <br />
        <div>
          <input type="radio" value="기타" name="reason" onClick={onReason} />
          기타
        </div>
        <br />
        <div>
          <textarea onChange={onContent} required />
        </div>
      </div>
      <ButtonWrapper>
        <button onClick={onClose}>취소</button>
        <button onClick={submitHandler} style={{ color: '#A3DCCD' }}>
          신고하기
        </button>
      </ButtonWrapper>
    </Modal>
  );
}

export default CommentReportModal;
