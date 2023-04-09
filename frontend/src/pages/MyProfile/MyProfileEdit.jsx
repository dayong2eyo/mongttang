import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';
import { userStore } from 'store/userStore';

import ProfileImg2 from 'components/common/ProfileImg2';
import Button from 'components/common/Button';
import moveToEdit from 'assets/icons/moveToEdit.svg';
import UserIcon from 'assets/images/UserIcon.svg';
import WithdrawalModal from 'pages/Withdrawal/WithdrawalModal';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10`}
`;
const ButtonContainer = styled.div`
  ${tw`flex my-2 justify-center`}
`;
const InfoContainer = styled.div`
  ${tw`flex justify-between items-center mt-2 mx-[25%] border-b-2`}
`;
const InfoWrapper = styled.div`
  ${tw`flex flex-col`}
`;
const InfoTitle = styled.span`
  ${tw`justify-start text-2xl`}
`;
const InfoContent = styled.span`
  ${tw`justify-start text-2xl text-[#626069]`}
`;
const ProfileImgContainer = styled.div`
  ${tw`flex justify-center items-center pt-[7%]`}
`;
const ImgWrapper = styled.div`
  ${tw`relative`}
`;
const ImgAddBtn = styled.div`
  ${tw`w-5 h-5 absolute right-0 bottom-0 fill-black drop-shadow-lg cursor-pointer`}
`;

function MyProfileEdit() {
  //프로필 조회 API 추가
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem('userId'));
  const [userNickname, setUserNickname] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userImage, setUserImage] = useState(UserIcon); //미리보기 이미지

  const [formData, setFormData] = useState(new FormData());
  const [isChanged, setIsChanged] = useState(false);
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  const { setUserImg } = userStore();

  useEffect(() => {
    authApi.get(requests.GET_PROFILE(userId)).then((res) => {
      setUserImage(res.data.profile.profileImgURL);
    });
  }, []);

  useEffect(() => {
    authApi.get(requests.GET_PROFILE(userId)).then((res) => {
      setUserNickname(res.data.profile.userNickname);
      setUserInfo(res.data.profile.userInfo);
    });
  });

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleClickAddImage = () => {
    fileInput.current.click();
  };
  const handleUserImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setUserImage(UserIcon);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    setIsChanged(true);
  };
  const changeToDefaultImg = () => {
    setUserImage(UserIcon);
    setFile(null);
  };
  const submitHandler = () => {
    if (file !== null) {
      formData.append('userImg', file);
      console.log(file);
    } else {
      formData.append('userImg', UserIcon, 'image.png');
      console.log(file);
    }

    const patch_profile_image = async () => {
      try {
        await authApi
          .patch(requests.PATCH_PROFILE_IMAGE(userId), formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => setUserImg(res.data.profileImgURL));
      } catch (error) {
        throw error;
      }
    };
    patch_profile_image().then(() => navigate('/myprofile'));
  };
  return (
    <div>
      {isModalOpen ? <WithdrawalModal onClose={onClose} /> : null}
      <ProfileImgContainer>
        <ImgWrapper>
          <ProfileImg2 userImg={userImage} />

          <ImgAddBtn onClick={handleClickAddImage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
            </svg>
          </ImgAddBtn>
        </ImgWrapper>
      </ProfileImgContainer>
      <input
        id="imageInput"
        type="file"
        accept="img/*"
        onChange={handleUserImage}
        className="display: hidden"
        multiple={false}
        ref={fileInput}
      />
      <ProfileContainer>
        <ButtonContainer>
          {isChanged ? (
            <div className="mx-2" onClick={submitHandler}>
              <Button title="저장" buttonType="black" className="" />
            </div>
          ) : null}
        </ButtonContainer>
      </ProfileContainer>
      <input
        id="imageInput"
        type="file"
        accept="img/*"
        onChange={handleUserImage}
        className="display: hidden"
        multiple={false}
      />
      <InfoContainer>
        <InfoWrapper>
          <InfoTitle>닉네임</InfoTitle>
          <InfoContent>{userNickname}</InfoContent>
        </InfoWrapper>
        <div onClick={() => navigate('/myprofile/edit/nickname')}>
          <img
            src={moveToEdit}
            alt="edit button"
            className="cursor-pointer"
            width="60%"
          />
        </div>
      </InfoContainer>
      <InfoContainer>
        <InfoWrapper>
          <InfoTitle>자기소개</InfoTitle>
          {userInfo ? (
            <InfoContent>{userInfo}</InfoContent>
          ) : (
            <InfoContent>자기소개를 작성해주세요</InfoContent>
          )}
        </InfoWrapper>
        <div onClick={() => navigate('/myprofile/edit/introduction')}>
          <img
            src={moveToEdit}
            alt="edit button"
            className="cursor-pointer"
            width="60%"
          />
        </div>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>회원탈퇴</InfoTitle>
        <div onClick={() => setIsModalOpen(true)}>
          <img
            src={moveToEdit}
            alt="edit button"
            className="cursor-pointer"
            width="60%"
          />
        </div>
      </InfoContainer>
    </div>
  );
}

export default MyProfileEdit;
