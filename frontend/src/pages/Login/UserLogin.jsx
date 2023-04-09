import React from 'react';
import tw, { styled } from 'twin.macro';
import requests from 'api/config';

import '../../components/common/Leaves.css';

//imgs
import logoImage from '../../assets/images/LogoM.png';
import kakaoBtn from '../../assets/images/kakao_login_en.svg';
import googleBtn from '../../assets/images/google_login_en.svg';
import Leaves from '../../components/common/Leaves';

const Wrapper = styled.div`
  ${tw`flex flex-col justify-center items-center h-full w-full`}

  & {
    .logo {
      ${tw`h-auto`}
    }

    .kakao {
    }

    .google {
    }
  }
`;

function UserLogin() {
  const kakaoLogin = () => {
    window.location.href = requests.KAKAO_LOGIN;
  };

  const googleLogin = () => {
    window.location.href = requests.GOOGLE_LOGIN;
  };

  return (
    <div className="leaves">
      <Leaves />
      <Wrapper>
        <img className="logo" src={logoImage} alt="" />
        <img className="kakao" src={kakaoBtn} onClick={kakaoLogin} alt="" />
        <img className="google" src={googleBtn} onClick={googleLogin} alt="" />
      </Wrapper>
    </div>
  );
}

export default UserLogin;
