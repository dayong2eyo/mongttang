import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import { useParams } from 'react-router-dom';
import requests from 'api/config';
import { authApi } from 'api/axios';

import ProfileImg from './ProfileImg';
import Button from './Button';
import useFormatDate from 'hooks/useFormatDate';
import LikeButtonFill from 'assets/icons/LikeButtonFill.svg';
import LikeButtonEmpty from 'assets/icons/LikeButtonEmpty.svg';
import pencil from 'assets/icons/pencil03.svg';
import trashCan from 'assets/icons/trashCan.svg';

const UserInfoContainer = styled.div`
  ${tw`flex flex-col mx-2 items-center`}
`;
const CommentFormcontainer = styled.div`
  ${tw`flex flex-nowrap items-center justify-center border-b-2`}
`;

const InputContainer = styled.textarea`
  ${tw` flex flex-wrap px-2 rounded-lg mt-4 p-1 w-[900px] h-[80px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;

const CommentContentContainer = styled.span`
  ${tw` flex flex-wrap justify-between my-1 w-[900px] text-xl pr-3`}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end items-center my-1 pr-3`}
`;
const Username = styled.span`
  ${tw`text-[16px] text-center w-[6rem]`}
`;
const CreaetTime = styled.span`
  ${tw`text-[14px]`}
`;
const NumOfLike = styled.span`
  ${tw`text-[20px] mr-1`}
`;

function CommentItem({
  comment,
  comments,
  commentId,
  setComments,
  setReportCommentId,
  setCommentReportModalOpen,
}) {
  const userId = Number(localStorage.getItem('userId'));
  const params = useParams();
  const formatDate = useFormatDate(comment.updatedTime);
  const [commentUsername, setCommentUsername] = useState('');
  const [numOfLike, setNumOfLike] = useState(comment.numOfLike);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [editComment, setEditComment] = useState(false);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const username = comment.commentUserNickname;
    const maxLength = 8;
    if (username.length > maxLength) {
      const truncatedString = username.slice(0, maxLength) + '...';
      setCommentUsername(truncatedString);
    } else {
      setCommentUsername(username);
    }
  }, []);

  const cancleLike = () => {
    setIsLiked(!isLiked);
    setNumOfLike(numOfLike - 1);
    //좋아요 취소 API 호출
  };
  const pressLike = () => {
    setIsLiked(!isLiked);
    setNumOfLike(numOfLike + 1);
    //좋아요 API 호출
  };

  const patchCommentHandler = () => {
    //댓글 등록 API 호출
    const patch_comment = async () => {
      try {
        const { data } = await authApi.patch(requests.PATCH_COMMENT(), {
          commentId: comment.commentId,
          commentUserId: userId,
          commentBookId: params.bookId,
          commentContent: commentContent,
        });
        setComments(data.comments);
      } catch (error) {
        throw error;
      }
    };
    patch_comment();
    setCommentContent('');
    setEditComment(false);
    //댓글목록 API 재 호출
    //댓글목록 다시 불러오면 state에 저장하고 리 렌더링하기 (현재는 테스트용)
  };
  const editCommentHandler = () => {
    setEditComment(true);
  };
  const exitHandler = () => {
    setEditComment(false);
  };
  const deleteCommentHandler = () => {
    //댓글 삭제 api 호출
    const delete_comment = async () => {
      try {
        const { data } = await authApi.delete(
          requests.DELETE_COMMENT(userId, comment.commentId),
        );
        setComments(data.comments);
      } catch (error) {
        throw error;
      }
    };
    delete_comment();
  };
  return (
    <CommentFormcontainer>
      <UserInfoContainer>
        <ProfileImg
          userId={comment.commentUserId}
          userImg={comment.userProfileImg}
        />
        <Username>{commentUsername}</Username>
        <CreaetTime>{formatDate}</CreaetTime>
      </UserInfoContainer>
      {editComment ? (
        <form action="submit">
          <InputContainer
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder={comment.commentContent}
            name="Comment Content"
          />
          <ButtonContainer>
            <div className="mx-1" onClick={patchCommentHandler}>
              <Button title="수정" buttonType="black" className="" />
            </div>
            <div onClick={exitHandler}>
              <Button title="취소" buttonType="black" className="" />
            </div>
          </ButtonContainer>
        </form>
      ) : (
        <form action="submit">
          <CommentContentContainer>
            {comment.commentContent}
            {comment.commentUserId === userId ? (
              <img
                src={trashCan}
                alt=""
                className="w-3 h-3"
                onClick={deleteCommentHandler}
              />
            ) : (
              ''
            )}
          </CommentContentContainer>
        </form>
      )}
      <ButtonContainer>
        {isLiked === true ? (
          <img src={LikeButtonFill} alt="" onClick={cancleLike} />
        ) : (
          <img src={LikeButtonEmpty} alt="" onClick={pressLike} />
        )}
        <NumOfLike>{numOfLike}</NumOfLike>
        {comment.commentUserId === userId ? (
          <img
            src={pencil}
            alt=""
            className="w-4 h-4 mr-[6px]"
            onClick={editCommentHandler}
          />
        ) : (
          <Button
            title="신고"
            buttonType="black"
            onClick={() => {
              setReportCommentId(commentId);
              setCommentReportModalOpen(true);
            }}
          />
        )}
      </ButtonContainer>
    </CommentFormcontainer>
  );
}

export default CommentItem;
