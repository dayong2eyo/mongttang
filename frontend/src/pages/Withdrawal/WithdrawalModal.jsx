/**
 * 회원탈퇴 진행
 */
import React, { useState } from 'react';
import Modal from 'components/common/Modal';
import { authApi } from 'api/axios';
import requests from 'api/config';

import tw, { styled } from 'twin.macro';
import LogoS from '../../assets/images/LogoS.png';
import { removeCookie } from 'utils/Cookie';
import { useNavigate } from 'react-router-dom';
import { userStore } from 'store/userStore';

const Content = styled.div`
  ${tw`flex flex-col items-center p-1 text-gray-500`}
  text-align: center;
`;
const Title = styled.p`
  ${tw`text-base p-0.5 underline underline-offset-0`}
`;

const Text = styled.p`
  ${tw`text-base p-0.5`}
`;

const SectionBox = styled.section`
  ${tw`text-lg border-solid border-1 rounded-lg text-red-500 w-full p-1`}
`;

const CheckBoxContainer = styled.div`
  ${tw`flex text-base`}
`;

function WithdrawalModal({ onClose }) {
  const { resetUser } = userStore((state) => state);

  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const userId =
    userStore((state) => state.userId) || localStorage.getItem('userId');

  const withdrawalUser = async () => {
    // const userId = localStorage.getItem('userId');
    try {
      await authApi.delete(requests.DELETE_USER(userId)).then((response) => {
        console.log('탈퇴 유저 아이디 ', userId);
        console.log(response);
        if (response.data.message === 'success') {
          localStorage.clear();
          removeCookie('refreshToken');
          resetUser();

          alert('그동안 이용해주셔서 감사합니다.');
          navigate('/home');
        }
      });
    } catch (error) {
    } finally {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <Content>
        <img src={LogoS} style={{ width: 100, height: 50 }} alt="" />
        <Title>탈퇴 전 확인하세요</Title>
        <br />
        <Text>탈퇴하시면 모든 데이터가 삭제되며,</Text>
        <Text>삭제된 데이터는 복구할 수 없습니다.</Text>
        <br />
        <SectionBox>
          <ul>
            <li>
              <p>모든 개인정보가 삭제됩니다.</p>
              <p>동화와 댓글은 삭제되지 않습니다.</p>
            </li>
          </ul>
        </SectionBox>
        <br />
        <CheckBoxContainer>
          <input type="checkbox" onClick={() => setIsDisabled(!isDisabled)} />
          <Text>모든 사항을 이해하고 확인하였으며, 동의합니다.</Text>
        </CheckBoxContainer>
        <br />
        <button onClick={withdrawalUser} disabled={isDisabled}>
          탈퇴하기
        </button>
      </Content>
    </Modal>
  );
}

export default WithdrawalModal;
