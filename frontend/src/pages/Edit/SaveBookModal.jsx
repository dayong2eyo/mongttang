import React from 'react';
import Modal from 'components/common/Modal';
import { useNavigate } from 'react-router-dom';

import tw, { styled, css } from 'twin.macro';
import { userStore } from 'store/userStore';
import { useState } from 'react';
import { useEffect } from 'react';

const ContentContainer = styled.div`
  ${tw`m-4 font-bold`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex flex-row m-1 mt-2 space-x-2 justify-around border-none text-sm`}
`;

function SaveBookModal({ onClose, saveFunc, message, setMessage }) {
  return (
    <Modal onClose={onClose}>
      <ContentContainer>{message}</ContentContainer>
      <hr />
      <ButtonWrapper>
        <button onClick={onClose}>취소</button>
        <button onClick={saveFunc} style={{ color: '#A3DCCD' }}>
          동화 만들기
        </button>
      </ButtonWrapper>
    </Modal>
  );
}

export default SaveBookModal;
