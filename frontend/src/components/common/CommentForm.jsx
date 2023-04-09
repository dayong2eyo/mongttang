import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileImg from './ProfileImg';
import tw, { styled, css } from 'twin.macro';
import Button from './Button';
import CommentItem from './CommentItem';
import requests from 'api/config';
import { authApi } from 'api/axios';
import { userStore } from 'store/userStore';

const BodyContainer = styled.div`
  ${tw`pt-[5%]`}
`;
const CommentContainer = styled.div`
  ${tw`flex flex-col-reverse`}
`;
const UserInfoContainer = styled.div`
  ${tw`flex flex-col items-center mx-2`}
`;
const CommentFormcontainer = styled.div`
  ${tw`flex items-center border-y-2 justify-center mb-2`}
`;
const FormContainer = styled.div`
  ${tw``}
`;
const InputContainer = styled.textarea`
  ${tw`flex flex-wrap p-1 px-2 rounded-lg mt-4 w-[900px] h-[80px] border-1 border-black font-[20px] text-main break-all`}
  ${(props) =>
    props.isValid
      ? tw`focus:outline focus:outline-primary`
      : tw`focus:outline focus:outline-secondary`}
      ${css`
    white-space: pre-line;
  `}
`;
const ButtonContainer = styled.div`
  ${tw`flex justify-end my-1`}
`;
const Username = styled.span`
  ${tw`text-[20px]`}
`;
const Comment = styled.span`
  ${tw`text-3xl`}
`;

function CommentForm({
  bookComments,
  setReportCommentId,
  setCommentReportModalOpen,
}) {
  const params = useParams();
  const userId = Number(localStorage.getItem('userId'));
  const userNickname = localStorage.getItem('userNickname');
  const [userImg, setUserImg] = useState();
  const [comments, setComments] = useState(bookComments);
  const [commentContent, setCommentContent] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    userStore.subscribe((state) => setUserImg(state.userImg));
    const fetchData = async () => {
      try {
        await authApi
          .get(requests.GET_PROFILE(localStorage.getItem('userId')))
          .then((res) => {
            setUserImg(res.data.profile.profileImgURL);
          });
      } catch (error) {}
    };
    fetchData();
  }, [userImg]);
  useEffect(() => {
    const maxLength = 8;
    if (userNickname.length > maxLength) {
      const truncatedString = userNickname.slice(0, maxLength) + '...';
      setUsername(truncatedString);
    } else {
      setUsername(username);
    }
  }, []);
  const submitHandler = () => {
    //댓글 등록 API 호출
    const post_comment = async () => {
      try {
        await authApi
          .post(requests.POST_COMMENT(userId), {
            commentUserId: userId,
            commentBookId: params.bookId,
            commentContent: commentContent,
          })
          .then((response) => {
            setComments(response.data.comments);
          });
      } catch (error) {
        throw error;
      }
    };
    post_comment();
    setCommentContent('');
  };
  return (
    <BodyContainer>
      <Comment>댓글</Comment>
      <CommentFormcontainer>
        <UserInfoContainer>
          <ProfileImg userId={userId} userImg={userImg} />
          <Username>{userNickname}</Username>
        </UserInfoContainer>
        <FormContainer>
          <form action="submit">
            <InputContainer
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="감상을 적어주세요"
              name="Comment Content"
            />
          </form>
          <ButtonContainer>
            <div onClick={submitHandler}>
              <Button title="등록" buttonType="black" className="" />
            </div>
          </ButtonContainer>
        </FormContainer>
      </CommentFormcontainer>
      <CommentContainer>
        {comments
          ? comments.map((comment) => (
              <div key={comment.commentId}>
                <CommentItem
                  commentId={comment.commentId}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  setReportCommentId={setReportCommentId}
                  setCommentReportModalOpen={setCommentReportModalOpen}
                />
              </div>
            ))
          : null}
      </CommentContainer>
    </BodyContainer>
  );
}

export default CommentForm;
