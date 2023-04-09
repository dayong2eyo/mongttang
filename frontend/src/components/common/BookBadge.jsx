/**
 * 순위가 매겨진 뱃지가 붙은 책 컴포넌트
 */
import * as React from 'react';
import { styled, Box } from '@mui/system';
import BadgeUnstyled, { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled';
import { Badge, badgeClasses } from '@mui/material';

const blue = {
  500: '#007FFF',
};

const grey = {
  300: '#afb8c1',
  400: '#bdbdbd',
  900: '#24292f',
};

const FirstBadge = styled(Badge)(
  ({ theme }) => `
  //기본 스타일
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  position: relative;
  display: inline-block;
  line-height: 1;

  //뱃지의 위치를 조정하는 부분
  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 15px;
    min-width: 60px;
    height: 60px;
    line-height: 35px;
    // font-family: 'Noto Sans KR', sans-serif;
    color: #4A4950;
    font-weight: 900;
    font-size: 20px;
    white-space: nowrap;
    text-align: center;
    border-radius: 40px;
    border: 7px;
    border-style: solid;
    border-color: #E28080;
    background: #FFFEF1;
    box-shadow: 0px 4px 16px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[300]
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `,
);

const StyledBadge = styled(Badge)(
  ({ theme }) => `
  //기본 스타일
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  list-style: none;
  position: relative;
  display: inline-block;
  line-height: 1;

  //뱃지의 위치를 조정하는 부분
  & .${badgeClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 15px;
    min-width: 50px;
    height: 50px;
    line-height: 35px;
    // font-family: 'Noto Sans KR', sans-serif;
    color: #4A4950;
    font-weight: 800;
    font-size: 15px;
    white-space: nowrap;
    text-align: center;
    border-radius: 40px;
    border: 7px;
    border-style: solid;
    border-color: #A9DCCD;
    background: #FAF7F5;
    box-shadow: 0px 4px 16px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[300]
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `,
);

// function BadgeContent() {
//   return (
//     <Box
//       component="span"
//       sx={{
//         width: 40,
//         height: 40,
//         borderRadius: '12px',
//         background: (theme) =>
//           theme.palette.mode === 'dark' ? grey[400] : grey[300],
//         display: 'inline-block',
//         verticalAlign: 'middle',
//       }}
//     />
//   );
// }

export default function BookBadge({ children, book, index }) {
  const rankBadge = '2등';

  if (index === 0)
    return <FirstBadge badgeContent={'1등'}>{children}</FirstBadge>;
  else
    return (
      <StyledBadge badgeContent={`${index + 1}등`}>{children}</StyledBadge>
    );
}
