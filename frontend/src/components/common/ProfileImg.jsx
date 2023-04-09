import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import UserIcon from 'assets/images/UserIcon.svg';

const Avatar = styled.div`
  ${tw`bg-primary border-b rounded-full bg-cover bg-center`}
  background-image: url(${(props) => props.img || UserIcon});
  width: ${(props) => props.width || '3rem'};
  height: ${(props) => props.height || '3rem'};
`;
function ProfileImg({ userImg, userId, height, width, onClick }) {
  const navigate = useNavigate();
  const userIdx = localStorage.getItem('userId');
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (userId === userIdx) {
      navigate('/myprofile');
    } else {
      navigate(`/profile/${userId}`);
    }
  };
  return (
    <div>
      {userImg ? (
        <Avatar
          img={userImg}
          height={height}
          width={width}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        />
      ) : (
        <Avatar img={UserIcon} height={height} width={width} />
      )}
    </div>
  );
}

export default ProfileImg;
