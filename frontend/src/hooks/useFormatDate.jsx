import React from 'react';

function FormatDate(rawDate) {
  /*
< 반환값 >
{년, 월, 일, 시, 분}을 담은 객체를 반환
*/
  const date = new Date(rawDate);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}.${month}.${day}`;
}

export default FormatDate;
