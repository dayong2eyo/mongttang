/**
 * 로그아웃 버튼을 눌렀을 때 확인절차를 위한 페이지
 */
import React, { useEffect, useRef, useState } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';

import tw, { styled, css } from 'twin.macro';

const ModalOverlay = styled.div`
  ${tw`flex items-center justify-center z-50 bg-neutral-400/80 h-full w-full fixed`}
`;

const ModalWrapper = styled.div`
  ${tw`bg-white flex flex-col items-center absolute border-solid rounded-xl h-auto w-auto shadow mt-[50%] mb-[50%] font-sans`}
`;

const ContentWrapper = styled.div`
  ${tw`m-1`}
`;

function Modal({ onClose, children }) {
  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };

  //모달 외부 클릭시 모달창 꺼짐
  useOutsideClick(modalRef, handleClose);

  //외부 스크롤 방지
  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ContentWrapper>{children}</ContentWrapper>
      </ModalWrapper>
    </ModalOverlay>
  );
}

export default Modal;
