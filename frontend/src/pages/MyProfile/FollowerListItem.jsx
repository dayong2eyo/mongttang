import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import ProfileImg from 'components/common/ProfileImg';

const UserInfoContainer = styled.div`
  ${tw`flex mx-2 space-x-2 items-center`}
`;
const FollowFormcontainer = styled.div`
  ${tw`flex flex-nowrap items-center border-b-2`}
`;

const Username = styled.span`
  ${tw`text-[16px] w-[6rem]`}
`;

function FollowerListItem({ userId, nickname, profileImg }) {
  return (
    <FollowFormcontainer>
      <UserInfoContainer>
        <ProfileImg userId={userId} userImg={profileImg} />
        <Username>{nickname}</Username>
      </UserInfoContainer>
    </FollowFormcontainer>
  );
}

export default FollowerListItem;
