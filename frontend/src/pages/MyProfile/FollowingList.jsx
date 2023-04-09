import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import FollowingListItem from './FollowingListItem';

const FollowerContainer = styled.div`
  ${tw`w-[30vw] h-[40vw] flex-col border-2 justify-center rounded-xl overflow-auto`}
`;
function FollowingList({ followings }) {
  return (
    <div>
      {followings.length !== 0 ? (
        <FollowerContainer>
          {followings !== []
            ? [...followings].map((following) => (
                <FollowingListItem
                  key={following.userId}
                  userId={following.userId}
                  nickname={following.userNickname}
                  profileImg={following.profileImgURL}
                />
              ))
            : ''}
        </FollowerContainer>
      ) : (
        '팔로워가 없어요'
      )}
    </div>
  );
}

export default FollowingList;
