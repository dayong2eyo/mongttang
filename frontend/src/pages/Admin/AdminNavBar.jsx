import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw, { styled } from 'twin.macro';
import LogoM from 'assets/images/LogoM.png';

// Styled Component

const Container = styled.div`
  ${tw`flex fixed flex-col items-center w-[279px] h-[1030px] border-b z-10 bg-brown1`}
`;
const Tab = styled.span`
  ${tw`block w-full text-center text-[36px] px-2 hover:text-secondary hover:underline hover:underline-offset-4 cursor-pointer`}
`;
const SmallTab = styled.span`
  ${tw`block w-full text-center text-[32px] px-2 hover:text-secondary hover:underline hover:underline-offset-4 cursor-pointer`}
`;
function AdminNavBar() {
  const location = useLocation().pathname;
  if (location.startsWith('/admin')) {
    return (
      <Container>
        <img
          src={LogoM}
          alt="navbar-logo"
          className="justify-self-auto w-[270px]"
        />
        <Link to="/admin/notice">
          <Tab
            className={`${
              location === '/admin/notice'
                ? 'text-secondary underline underline-offset-4'
                : 'text-black'
            }`}
          >
            공지사항
          </Tab>
        </Link>
        <span className="block w-full text-center text-[36px] px-2">
          신고 내역
        </span>
        <Link to="/admin/report/book">
          <SmallTab
            className={`${
              location === '/admin/report/book'
                ? 'text-secondary underline underline-offset-4'
                : 'text-black'
            }`}
          >
            동화
          </SmallTab>
        </Link>
        <Link to="/admin/report/comment">
          <SmallTab
            className={`${
              location === '/admin/report/comment'
                ? 'text-secondary underline underline-offset-4'
                : 'text-black'
            }`}
          >
            댓글
          </SmallTab>
        </Link>
        <Link to="/admin/challenge">
          <Tab
            className={`${
              location === '/admin/challenge'
                ? 'text-secondary underline underline-offset-4'
                : 'text-black'
            }`}
          >
            챌린지
          </Tab>
        </Link>
      </Container>
    );
  } else {
    return null;
  }
}
export default AdminNavBar;
