//BookInfo 추가버전
import React from 'react';

import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E7D4C6',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#B79F93',
  },
}));

const TextWrapper = styled('div')(({ margin }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: `${margin}`,
}));

function BookIndex({ book, margin }) {
  const total = book.numOfViews + book.numOfLike + book.numOfComment;

  return (
    <div>
      <Box width={150}>
        <TextWrapper margin={margin}>
          <p>조회수</p>
          <p>{book.numOfViews}</p>
        </TextWrapper>
        <BorderLinearProgress
          variant="determinate"
          value={(book.numOfViews / total) * 100}
        />
      </Box>
      <Box width={150}>
        <TextWrapper margin={margin}>
          <p>좋아요 수</p>
          <p>{book.numOfLike}</p>
        </TextWrapper>
        <BorderLinearProgress
          variant="determinate"
          value={(book.numOfLike / total) * 100}
        />
      </Box>
      <Box width={150}>
        <TextWrapper margin={margin}>
          <p>댓글 수</p>
          <p>{book.numOfComment}</p>
        </TextWrapper>
        <BorderLinearProgress
          variant="determinate"
          value={(book.numOfComment / total) * 100}
        />
      </Box>
      <Box width={150}>
        <TextWrapper margin={margin}>
          <p>총점 : </p>
          <p>{book.total}</p>
        </TextWrapper>
      </Box>
    </div>
  );
}

export default BookIndex;
