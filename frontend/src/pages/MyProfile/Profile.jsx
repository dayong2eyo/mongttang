import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import UserIcon from 'assets/images/UserIcon.svg';
import ProfileImg2 from 'components/common/ProfileImg2';
import BookListItem from 'components/common/BookListItem';
import { userStore } from 'store/userStore';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[80px]`}
`;
const NickNameWrapper = styled.div`
  ${tw`flex items-center pt-2`}
`;
const Following = styled.span`
  ${tw`text-[30px] px-2 cursor-pointer rounded-full shadow`}
  ${(props) =>
    props.show === true
      ? tw`bg-btnMint text-black hover:opacity-70 transition-opacity`
      : tw`hover:opacity-70 transition-opacity`}
`;

const Follower = styled.span`
  ${tw`text-[30px] px-2 cursor-pointer rounded-full shadow`}
  ${(props) =>
    props.show === true
      ? tw`bg-btnMint text-black hover:opacity-70 transition-opacity`
      : tw`hover:opacity-70 transition-opacity`}
`;

const FollowButton = styled.div`
  ${tw`text-[30px] px-2 cursor-pointer rounded-full shadow`}
  ${(props) => (props.isFollowed === true ? tw`bg-btnMint text-black ` : tw``)}
`;
const NickName = styled.span`
  ${tw`text-[40px]`}
`;
const InfoWrapper = styled.div`
  ${tw`flex items-center justify-between`}
`;
const UserInfo = styled.span`
  ${tw`text-[35px] pt-2`}
`;
const CompletedBookList = styled.div`
  ${tw`flex px-10`}
`;
const InCompleteBookList = styled.div`
  ${tw`flex px-10`}
`;
const LikedBookList = styled.div`
  ${tw`flex px-10`}
`;
const PurchasedBookList = styled.div`
  ${tw`flex px-10`}
`;

function Profile() {
  const params = useParams();
  const userIdx = localStorage.getItem('userId');
  const userId = params.userId;
  const [userImg, setUserImg] = useState(UserIcon);
  const [userNickname, setUserNickname] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFollower, setUserFollower] = useState('');
  const [userFollowing, setUserFollowing] = useState('');
  const [myBooks, setMyBooks] = useState('');
  const [inCompleteBooks, setInCompleteBooks] = useState('');
  const [interestBooks, setInterestBooks] = useState('');
  const [paidBooks, setPaidBooks] = useState('');
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followings, setFollowings] = useState();
  const [followers, setFollowers] = useState();
  const [isFollow, setIsFollow] = useState('false');
  const showFollowerHandler = () => {
    if (showFollowing) {
      setShowFollowing(false);
    }
    setShowFollower(!showFollower);
  };
  const showFollowingHandler = () => {
    if (showFollower) {
      setShowFollower(false);
    }
    setShowFollowing(!showFollowing);
  };

  const addFollowHandler = () => {
    const post_follow = async () => {
      try {
        const { data } = await authApi.post(
          requests.POST_FOLLOW(userIdx, userId),
        );
        setIsFollow(data.isFollow);
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    post_follow();
  };
  const deleteFollowHandler = () => {
    const delete_follow = async () => {
      try {
        const { data } = await authApi.delete(
          requests.DELETE_FOLLOW(userIdx, userId),
        );
        setIsFollow(data.isFollow);
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    delete_follow();
  };
  useEffect(() => {
    const get_user = async () => {
      try {
        const { data } = await authApi.get(requests.GET_PROFILE(userId));
        setUserNickname(data.profile.userNickname);
        setUserFollower(data.profile.numOfFollower);
        setUserFollowing(data.profile.numOfFollowing);
        setUserInfo(data.profile.userInfo);
        setUserImg(data.profile.profileImgURL);
        setMyBooks(data.profile.myBooks);
        setInCompleteBooks(data.profile.inCompleteBooks);
        setInterestBooks(data.profile.interestBooks);
        setPaidBooks(data.profile.paidBooks);
        setIsFollow(data.profile.follow);
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    const get_following = async () => {
      try {
        const { data } = await authApi.get(requests.GET_FOLLOWING(userId));
        setFollowings(data.followings);
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    const get_follower = async () => {
      try {
        const { data } = await authApi.get(requests.GET_FOLLOWER(userId));
        setFollowers(data.followers);
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    get_following();
    get_follower();
    get_user();
  }, [userId]);
  useEffect(() => {
    const get_follower = async () => {
      try {
        const { data } = await authApi.get(requests.GET_FOLLOWER(userId));
        setFollowers(data.followers);
        setUserFollower(data.followers.length);
        console.log(data);
      } catch (error) {
        throw error;
      }
    };
    get_follower();
  }, []);
  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 userImg={userImg} />
        <NickNameWrapper>
          <NickName>{userNickname}</NickName>
        </NickNameWrapper>
        <InfoWrapper>
          <Following onClick={showFollowingHandler} show={showFollowing}>
            팔로잉 {userFollowing}
          </Following>
          <Follower onClick={showFollowerHandler} show={showFollower}>
            팔로워 {userFollower}
          </Follower>
          {isFollow ? (
            <FollowButton onClick={deleteFollowHandler} isFollowed={isFollow}>
              팔로우 취소
            </FollowButton>
          ) : (
            <FollowButton onClick={addFollowHandler} isFollowed={isFollow}>
              팔로우 하기
            </FollowButton>
          )}
        </InfoWrapper>
        {showFollowing ? <FollowingList followings={followings} /> : ''}
        {showFollower ? <FollowerList followers={followers} /> : ''}
        {userInfo ? (
          <UserInfo>{userInfo}</UserInfo>
        ) : (
          <UserInfo>소개를 작성해 주세요</UserInfo>
        )}
      </ProfileContainer>
      <CompletedBookList>
        <span className="text-[40px]">완성한 동화</span>
        {myBooks.length !== 0
          ? myBooks.map((book) => {
              return (
                <BookListItem
                  key={book.bookId}
                  width="w-[180px]"
                  height="h-[240px]"
                  book={book}
                />
              );
            })
          : null}
      </CompletedBookList>
      <LikedBookList>
        <span className="text-[40px]">관심목록</span>
        {interestBooks.length !== 0
          ? interestBooks.map((book) => {
              return (
                <BookListItem
                  key={book.bookId}
                  width="w-[180px]"
                  height="h-[250px]"
                  book={book}
                />
              );
            })
          : null}
      </LikedBookList>
    </div>
  );
}

export default Profile;
