import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import UserIcon from 'assets/images/UserIcon.svg';
import ProfileImg2 from 'components/common/ProfileImg2';
import EditProfileIcon from 'assets/icons/pencil03.svg';
import BookListItem from 'components/common/BookListItem';
import { userStore } from 'store/userStore';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full pt-[7%] text-[#626069]`}
`;
const NickNameWrapper = styled.div`
  ${tw`flex items-center pt-2`}
`;

const NickName = styled.span`
  ${tw`text-3xl`}
`;
const InfoWrapper = styled.div`
  ${tw`flex items-center justify-between space-x-2 py-2`}
`;
const Following = styled.span`
  ${tw`text-2xl px-2 cursor-pointer rounded-full shadow`}
  ${(props) =>
    props.show === true
      ? tw`bg-btnMint text-black hover:opacity-70 transition-opacity`
      : tw`hover:opacity-70 transition-opacity`}
`;

const Follower = styled.span`
  ${tw`text-2xl px-2 cursor-pointer rounded-full shadow`}
  ${(props) =>
    props.show === true
      ? tw`bg-btnMint text-black hover:opacity-70 transition-opacity`
      : tw`hover:opacity-70 transition-opacity`}
`;
const UserInfo = styled.span`
  ${tw`text-2xl pt-2`}
`;

const CompletedBookContainer = styled.div`
  ${tw`flex flex-col px-[13%] h-[10%] w-[1200px]`}
`;

const CompletedBookList = styled.div`
  ${tw`flex py-2 text-[#626069]`}
`;

const LikedBookContainer = styled.div`
  ${tw`flex flex-col px-[13%] h-[10%] w-[1200px]`}
`;
const LikedBookList = styled.div`
  ${tw`flex py-2 text-[#626069]`}
`;

const PurchasedBookContainer = styled.div`
  ${tw`flex flex-col px-[13%] h-[10%] w-[1200px]`}
`;
const PurchasedBookList = styled.div`
  ${tw`flex py-2 text-[#626069]`}
`;

function MyProfile() {
  const userId = Number(localStorage.getItem('userId'));
  const [userImg, setUserImg] = useState(UserIcon);
  const [userNickname, setUserNickname] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [userFollower, setUserFollower] = useState('');
  const [userFollowing, setUserFollowing] = useState('');
  const [myBooks, setMyBooks] = useState('');
  const [inCompleteBooks, setInCompleteBooks] = useState('');
  const [interestBooks, setInterestBooks] = useState('');
  const [paidBooks, setPaidBooks] = useState('');
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const wallet = userStore((state) => state.userWallet);
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
  const openWallet = () => {
    window.open(
      `http://j8a308.p.ssafy.io:3333/?key=${wallet}`,
      'MyWallet',
      'toolbar=no, menubar=no, width=550, height=780',
    );
  };
  //프로필 조회 api사용
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
        // console.log(data);
      } catch (error) {
        throw error;
      }
    };
    const get_following = async () => {
      try {
        const { data } = await authApi.get(requests.GET_FOLLOWING(userId));
        setFollowings(data.followings);
        // console.log(data);
      } catch (error) {
        throw error;
      }
    };
    const get_follower = async () => {
      try {
        const { data } = await authApi.get(requests.GET_FOLLOWER(userId));
        setFollowers(data.followers);
        // console.log(data);
      } catch (error) {
        throw error;
      }
    };

    get_following();
    get_follower();
    get_user();
  }, []);

  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 userImg={userImg} />
        <NickNameWrapper>
          <NickName>{userNickname}</NickName>
          <Link to="/myprofile/edit">
            <img
              src={EditProfileIcon}
              alt="edit icon"
              className="w-[40px] h-[40px]"
            />
          </Link>
        </NickNameWrapper>
        <InfoWrapper>
          <Following onClick={showFollowingHandler} show={showFollowing}>
            팔로잉 {userFollowing}
          </Following>
          <Follower onClick={showFollowerHandler} show={showFollower}>
            팔로워 {userFollower}
          </Follower>
        </InfoWrapper>
        {showFollowing ? <FollowingList followings={followings} /> : ''}
        {showFollower ? <FollowerList followers={followers} /> : ''}
        {userInfo ? (
          <UserInfo>{userInfo}</UserInfo>
        ) : (
          <UserInfo>소개를 작성해 주세요</UserInfo>
        )}
        {/* <NickName onClick={openWallet}>지갑보러가기</NickName> */}
      </ProfileContainer>
      <CompletedBookContainer>
        <span className="text-3xl">완성한 동화</span>
        <CompletedBookList>
          {myBooks.length !== 0 ? (
            myBooks.map((book) => {
              return (
                <BookListItem
                  key={book.bookId}
                  width="w-[180px]"
                  height="h-[240px]"
                  book={book}
                />
              );
            })
          ) : (
            <div>
              <p>완성한 동화가 없어요!</p>
            </div>
          )}
        </CompletedBookList>
      </CompletedBookContainer>

      <LikedBookContainer>
        <span className="text-3xl">관심목록</span>
        <LikedBookList>
          {interestBooks.length !== 0 ? (
            interestBooks.map((book) => {
              return (
                <BookListItem
                  key={book.bookId}
                  width="w-[180px]"
                  height="h-[250px]"
                  book={book}
                />
              );
            })
          ) : (
            <div>
              <p>관심목록에 등록한 동화가 없어요</p>
            </div>
          )}
        </LikedBookList>
      </LikedBookContainer>
      <PurchasedBookContainer>
        <div className="text-3xl">구매목록</div>
        <PurchasedBookList>
          {paidBooks.length !== 0 ? (
            paidBooks.map((book) => {
              return (
                <BookListItem
                  key={book.bookId}
                  width="w-[180px]"
                  height="h-[250px]"
                  book={book}
                />
              );
            })
          ) : (
            <div>
              <p>구매한 동화가 없어요</p>
            </div>
          )}
        </PurchasedBookList>
      </PurchasedBookContainer>
    </div>
  );
}

export default MyProfile;
