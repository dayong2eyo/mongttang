import React, { useEffect, useState } from 'react';
import tw, { styled, css } from 'twin.macro';

import FollowerListItem from './FollowerListItem';

const FollowerContainer = styled.div`
  ${tw`w-[30vw] h-[40vw] flex-col border-2 justify-center rounded-xl overflow-auto`}
`;
function FollowerList({ followers }) {
  return (
    <div>
      {followers.length !== 0 ? (
        <FollowerContainer>
          {followers !== null
            ? [...followers].map((follower) => (
                <FollowerListItem
                  key={follower.userId}
                  userId={follower.userId}
                  nickname={follower.userNickname}
                  profileImg={follower.profileImgURL}
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

export default FollowerList;
