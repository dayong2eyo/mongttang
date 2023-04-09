import React, { useEffect, useRef, useState } from 'react';
import tw, { styled, css } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import useOutsideClick from 'hooks/useOutsideClick';
import Coin from '../../assets/icons/Coin.svg';
import requests from 'api/config';
import { authApi, transactionApi } from 'api/axios';

const ModalOverlay = styled.div`
  ${tw`flex items-center justify-center z-50 h-3/5 w-full h-2/3 fixed `}
`;

const ModalWrapper = styled.div`
  ${tw`bg-white flex flex-col items-center absolute border-solid rounded-2xl h-auto shadow mt-[50%] mb-[50%] font-edu`}
`;

const PriceWrapper = styled.div`
  ${tw`text-[#626069] flex flex-row items-center underline underline-offset-4 px-1`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-col justify-center items-center px-4 pt-2 text-lg space-y-1`}
`;

const BtnContainer = styled.div`
  ${tw`bg-[#D6D3CE] text-[#626069] flex flex-row mt-1 w-full h-full space-x-10 justify-center text-lg rounded-b-2xl`}
`;

const BtnWrapper = styled.div`
  ${tw`py-2`}
`;

export default function TransactionModal({
  bookId,
  bookPrice,
  tokenId,
  onClose,
}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const wallet = localStorage.getItem('privateKey');
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(0);

  const modalRef = useRef(null);
  const handleClose = () => {
    onClose?.();
  };
  const encodedWallet = encodeURIComponent(wallet);

  useEffect(() => {
    setPrice(bookPrice);

    transactionApi
      .get(`/token/mtt/?key=${wallet}`)
      .then((res) => setBalance(res.data));
  }, []);

  //모달 외부 클릭시 모달창 꺼짐
  useOutsideClick(modalRef, handleClose);

  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  const openWallet = () => {
    onClose();
    window.open(
      `${requests.wallet_url}/trade/?key=${encodedWallet}`,
      'MyWallet',
      'toolbar=no, menubar=no, width=550, height=780',
    );
  };

  const transaction = () => {
    //구매요청 -> 블록체인 네트워크
    transactionApi.post('/token/read', {
      tokenId: tokenId,
      amountToAuthor: price * 0.7,
      amountToManager: price * 0.3,
      privateKey: wallet,
    });

    //구매요청 -> 백엔드(구매목록에 추가하는 API 호출)
    authApi
      .post(requests.POST_BOOK_PAYLIST(userId, bookId))
      .then((res) => {
        if (res.status === 200) {
          //정상적으로 처리가 되면 viewer로 이동
          alert('작품 구매가 완료되었습니다.');
          navigate(`/books/viewer/${bookId}`);
        }
      })
      .catch(() => {
        alert('구매에 실패했습니다. 다시 시도해주세요.');
        onClose();
      });
  };

  const buyBook = () => {
    //잔액이 모자랄 시 구매버튼 누르면 거래소로 안내
    if (balance < price) {
      if (window.confirm('잔액이 부족합니다. 거래소로 이동하시겠습니까?')) {
        openWallet();
      }
    } else {
      transaction();
    }
  };

  return (
    <ModalOverlay>
      <ModalWrapper ref={modalRef}>
        <ContentContainer>
          <PriceWrapper>
            <img src={Coin} alt="coin" />
            코인 차감 안내
          </PriceWrapper>
          <div>현재 보유 코인 : {balance} MTT</div>
          <div>구매에 필요한 코인 : {price} MTT</div>
        </ContentContainer>

        <BtnContainer>
          <BtnWrapper>
            <button onClick={buyBook}>구매</button>
          </BtnWrapper>
          <BtnWrapper>
            <button onClick={onClose}>취소</button>
          </BtnWrapper>
        </BtnContainer>
      </ModalWrapper>
    </ModalOverlay>
  );
}
