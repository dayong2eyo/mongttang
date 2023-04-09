import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';
import { userStore } from 'store/userStore';

import ProfileImg2 from 'components/common/ProfileImg2';
import moveToEdit from 'assets/icons/moveToEdit.svg';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[7%]`}
`;
const InfoTitle = styled.span`
  ${tw`justify-start text-2xl`}
`;
const InputContainer = styled.div`
  ${tw`flex-col mt-4 py-2 mx-[25%]`}

  & {
    input {
      ${tw`w-full rounded-lg mb-1 p-1 box-border text-2xl text-main`}
      font-size: 30px;
      ${(props) =>
        props.isValid
          ? tw`focus:outline focus:outline-primary`
          : tw`focus:outline focus:outline-secondary`}
    }
    p {
      ${tw`text-secondary `}
    }
  }
`;
const ButtonContainer = styled.div`
  ${tw`w-full h-[40px] my-[1%] bg-btnBlack text-whiteText rounded-lg flex justify-center items-center`}
`;

function NicknameEdit() {
  const userNickname = localStorage.getItem('userNickname');
  const userId = localStorage.getItem('userId');
  const userInfo = localStorage.getItem('userInfo');
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState();
  const [nickname, setNickname] = useState('');
  const [verify, setVerify] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const { setUserNickname } = userStore((state) => state);
  const [isChanged, setIsChanged] = useState(false);
  const onChangeNicknameInput = useCallback((e) => {
    setNickname(e.target.value);
    setIsNicknameTouched(true);

    if (e.target.value.trim() === '') {
      setIsNicknameValid(false);
      setNicknameMessage('닉네임을 입력해주세요.');
      return;
    } else if (
      e.target.value.trim().length < 2 ||
      e.target.value.trim().length > 10
    ) {
      setIsNicknameValid(false);
      setNicknameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      return;
    } else {
      setNicknameMessage('');
      setIsNicknameValid(true);
    }
  }, []);
  const onClickVerifyingHandler = () => {
    const get_nickname_available = async () => {
      try {
        const response = await authApi.get(
          requests.GET_NICKNAME_AVAILABLE(nickname),
        );
        if (response.data.message === 'success') {
          setVerify('success');
          setIsChanged(true);
        } else if (response.status === 400) {
          setVerify('fail');
          setVerifyMessage('이미 사용중인 닉네임입니다.');
        } else {
          setVerify('fail');
        }
      } catch (error) {
        throw error;
      }
    };
    get_nickname_available().then((res) => console.log(res));
  };

  useEffect(() => {
    const get_user = async () => {
      try {
        const { data } = await authApi.get(requests.GET_PROFILE(userId));
        setUserImg(data.profile.profileImgURL);
      } catch (error) {
        throw error;
      }
    };

    get_user();
  }, [userImg]);

  useEffect(() => {
    if (verify === 'success') {
      setVerifyMessage('중복확인이 완료되었습니다');
    } else if (verify === 'fail') {
      setVerifyMessage('중복확인이 실패했습니다');
    }
  }, [verify, isChanged]);
  const submitHandler = () => {
    //닉네임 변경 API 추가
    if (verify === 'success') {
      const patch_user_nickname = async () => {
        try {
          const response = await authApi.patch(
            requests.PATCH_USER_NICKNAME(userId, nickname),
          );

          setUserNickname(response.data.userNickname);
          localStorage.setItem('userNickname', response.data.userNickname);
        } catch (error) {
          throw error;
        }
      };
      patch_user_nickname();
      navigate('/myprofile');
    }
  };
  const isValidName = isNicknameTouched && isNicknameValid;

  //프로필조회API사용
  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 userImg={userImg} />
      </ProfileContainer>
      <form action="submit">
        <InputContainer disabled={isValidName ? false : true}>
          <InfoTitle>닉네임</InfoTitle>
          <p>{verifyMessage}</p>
          <input
            type="text"
            onChange={onChangeNicknameInput}
            placeholder={userNickname}
            name="Username"
            disabled={isChanged}
          />
          <p>{nicknameMessage}</p>
          <ButtonContainer onClick={onClickVerifyingHandler}>
            중복확인
          </ButtonContainer>
          {/* 저장 클릭시 API호출하는 onClick 함수 선언 필요 */}
          {verify === 'success' ? (
            <ButtonContainer onClick={submitHandler}>저장</ButtonContainer>
          ) : (
            ''
          )}
        </InputContainer>
      </form>
    </div>
  );
}

export default NicknameEdit;
