import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import UserIcon from 'assets/images/UserIcon.svg';

const Avatar = styled.div`
  ${tw`bg-primary border-b border-black rounded-full w-[167px] h-[167px] bg-cover bg-center mt-4`}
  ${(props) =>
    props.img
      ? css`
          background-image: url(${props.img});
        `
      : tw`bg-primary`}
`;

function ProfileImg({ userImg, onClick }) {
  return (
    <div>
      {userImg ? (
        <Avatar img={userImg} onClick={onClick} style={{ cursor: 'pointer' }} />
      ) : (
        <Avatar img={UserIcon} />
      )}
    </div>
  );
}

export default ProfileImg;
