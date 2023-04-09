import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

import requests from 'api/config';
import { defaultApi, authApi } from 'api/axios';

import ProfileImg2 from 'components/common/ProfileImg2';

const ProfileContainer = styled.div`
  ${tw`flex flex-col items-center justify-center w-full z-10 pt-[7%]`}
`;
const InfoTitle = styled.span`
  ${tw`justify-start text-2xl`}
`;
const InputContainer = styled.div`
  ${tw`flex-col mt-4 py-2 px-[25%]`}

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
function IntroductionEdit() {
  const userId = Number(localStorage.getItem('userId'));
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState();
  const [userInfo, setUserInfo] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [introductionMessage, setIntroductionMessage] = useState('');
  const [isIntroductionTouched, setIsIntroductionTouched] = useState(false);
  const [isIntroductionValid, setIsIntroductionValid] = useState(false);
  const [isSuccess, setIsSuccess] = useState('');
  const onChangeIntroductionInput = useCallback((e) => {
    setIntroduction(e.target.value);
    setIsIntroductionTouched(true);

    if (e.target.value.trim().length > 40) {
      setIsIntroductionValid(false);
      setIntroductionMessage('40글자 미만으로 입력해주세요.');
      return;
    } else {
      setIntroductionMessage('');
      setIsIntroductionValid(true);
    }
  }, []);
  const submitHandler = () => {
    //자기소개 변경 API 추가
    if (isValidIntroduction) {
      const patch_user_info = async () => {
        try {
          const { data } = await authApi.patch(
            requests.PATCH_USER_INFO(userId),
            {
              userInfo: introduction,
            },
          );
          setIsSuccess(data.message);
        } catch (error) {
          throw error;
        }
      };

      patch_user_info();
    }
  };

  useEffect(() => {
    const get_user = async () => {
      try {
        const { data } = await authApi.get(requests.GET_PROFILE(userId));
        setUserImg(data.profile.profileImgURL);
        setUserInfo(data.profile.userInfo);
      } catch (error) {
        throw error;
      }
    };

    get_user();
  }, [userImg]);

  useEffect(() => {
    if (isSuccess === 'success') {
      navigate('/myprofile');
    }
  }, [isSuccess]);
  const isValidIntroduction = isIntroductionTouched && isIntroductionValid;

  //프로필조회API사용
  return (
    <div>
      <ProfileContainer>
        <ProfileImg2 userImg={userImg} />
      </ProfileContainer>
      <form action="submit">
        <InputContainer disabled={isValidIntroduction ? false : true}>
          <InfoTitle>자기소개</InfoTitle>
          <input
            type="text"
            onChange={onChangeIntroductionInput}
            placeholder={userInfo}
            name="Introduction"
          />
          <p>{introductionMessage}</p>
          {/* 저장 클릭시 API호출하는 onClick 함수 선언 필요 */}
          <ButtonContainer onClick={submitHandler}>저장</ButtonContainer>
        </InputContainer>
      </form>
    </div>
  );
}

export default IntroductionEdit;
