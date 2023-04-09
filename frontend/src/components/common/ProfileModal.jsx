import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import tw, { styled, css } from 'twin.macro';
import { authApi } from 'api/axios';
import requests from 'api/config';
import { removeCookie } from 'utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { userStore } from 'store/userStore';
import ProfileImg2 from './ProfileImg2';
import ProfileBtn from '../../assets/icons/ProfileBtn.svg';
import WalletBtn from '../../assets/icons/WalletBtn.svg';
import EditBtn from '../../assets/icons/EditBtn.svg';
import useOutsideClick from 'hooks/useOutsideClick';

const ModalOverlay = styled.div`
  ${tw`flex items-center justify-end z-50 h-3/5 w-full top-[8vh] right-[2vw] fixed`}
`;

const ModalWrapper = styled.div`
  ${tw`bg-white flex flex-col items-center absolute border-solid rounded-2xl h-auto shadow mt-[50%] mb-[50%] font-sans`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col justify-center items-center p-0.5 pt-0 text-lg `}
`;
const ProfileContainer = styled.div`
  ${tw`flex flex-col justify-center items-center p-1 pt-0 font-edu`}
`;

const ProfileImgWrapper = styled.div``;
const ProfileInfoContainer = styled.div`
  ${tw`flex flex-col justify-center items-center mt-2`}
`;
const UserNameWrapper = styled.div`
  ${tw`text-2xl pb-1`}
`;

const FollowContainer = styled.div`
  ${tw`flex space-x-2`}
`;
const FollowWrapper = styled.div``;
const FollowingWrapper = styled.div``;

const BtnContainer = styled.div`
  ${tw`flex flex-row pl-1`}
`;

const ProfileBtnContainer = styled.div`
  ${tw`m-1 p-0 mb-0`}
`;
const WalletBtnContainer = styled.div`
  ${tw`m-1 p-0 pl-1 mb-0`}
`;
const EditBtnContainer = styled.div`
  ${tw`m-1 p-0 mb-0`}
`;

const BtnWrapper = styled.div`
  ${tw`flex flex-col py-2 w-full bg-[#D6D3CE] text-[#626069] rounded-b-2xl`}
`;

function ProfileModal({ onClose }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const { resetUser } = userStore((state) => state);
  const wallet = localStorage.getItem('privateKey');
  const encodedWallet = encodeURIComponent(wallet);

  const [userImg, setUserImg] = useState('');
  const [userNickname, setUserNickname] = useState('');
  const [numOfFollower, setNumOfFollower] = useState(0);
  const [numOfFollowing, setNumOfFollowing] = useState(0);

  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  //모달 외부 클릭시 모달창 꺼짐
  useOutsideClick(modalRef, handleClose);

  useEffect(() => {
    // const $body = document.querySelector('body');
    // const overflow = $body.style.overflow;
    // $body.style.overflow = 'hidden';

    authApi(requests.GET_PROFILE(userId)).then((response) => {
      if (response.status === 200) {
        setUserImg(response.data.profile.profileImgURL);
        setUserNickname(response.data.profile.userNickname);
        setNumOfFollower(response.data.profile.numOfFollower);
        setNumOfFollowing(response.data.profile.numOfFollowing);
        // console.log(response);
      }
    });

    // return () => {
    //   $body.style.overflow = overflow;
    // };
  }, []);

  const logout = () => {
    authApi(requests.GET_LOGOUT(userId))
      .then((response) => {
        localStorage.clear();
        removeCookie('refreshToken');
        resetUser();
      })
      .finally(() => onClose());
    navigate('/home');
  };

  const openProfile = () => {
    onClose();
    navigate('/myprofile');
  };

  const openWallet = () => {
    onClose();
    window.open(
      `${requests.wallet_url}/?key=${encodedWallet}`,
      'MyWallet',
      'toolbar=no, menubar=no, width=550, height=780',
    );
  };

  const openEdit = () => {
    onClose();
    navigate('/myprofile/edit');
  };

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ProfileContainer>
          <ProfileImgWrapper>
            <ProfileImg2 userImg={userImg} onClick={openEdit} />
          </ProfileImgWrapper>
          <ProfileInfoContainer>
            <UserNameWrapper>{userNickname}님</UserNameWrapper>
            <FollowContainer>
              <FollowWrapper>팔로워 {numOfFollower}명</FollowWrapper>
              <FollowingWrapper>팔로잉 {numOfFollowing}명</FollowingWrapper>
            </FollowContainer>
          </ProfileInfoContainer>
        </ProfileContainer>
        <hr />
        <ContentContainer>
          <BtnContainer>
            <ProfileBtnContainer>
              <button onClick={openProfile}>
                <img src={ProfileBtn} alt="profile" />
              </button>
            </ProfileBtnContainer>
            <WalletBtnContainer>
              <button onClick={openWallet}>
                <img src={WalletBtn} alt="wallet" />
              </button>
            </WalletBtnContainer>
            <EditBtnContainer>
              <button onClick={openEdit}>
                <img src={EditBtn} alt="edit" />
              </button>
            </EditBtnContainer>
          </BtnContainer>
        </ContentContainer>
        <hr />
        <BtnWrapper>
          <button onClick={logout}>로그아웃</button>
        </BtnWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
}

export default ProfileModal;
