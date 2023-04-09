import React from 'react';
import tw, { styled } from 'twin.macro';
import Button from 'components/common/Button';
import { useNavigate } from 'react-router-dom';

const BodyContainer = styled.div`
  ${tw`flex flex-col justify-center items-center h-screen w-screen`}
`;

const BtnContainer = styled.div`
  ${tw`flex space-x-1`}
`;

const TitleWrapper = styled.p`
  ${tw`text-2xl font-bold p-1`}
`;

const ContentWrapper = styled.p`
  ${tw`text-lg text-[#626069]`}
`;
export default function ErrorPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  console.log(userId);
  return (
    <div>
      {userId ? (
        <BodyContainer>
          <TitleWrapper>페이지를 찾을 수 없습니다.</TitleWrapper>
          <ContentWrapper>
            찾으려는 페이지의 주소가 잘못 입력되었거나,
          </ContentWrapper>
          <ContentWrapper>
            주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          </ContentWrapper>
          <ContentWrapper>
            입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
          </ContentWrapper>
          <br />
          <Button
            title="홈으로"
            buttonType="black"
            onClick={() => navigate('/')}
          />
        </BodyContainer>
      ) : (
        <BodyContainer>
          <TitleWrapper>로그인한 사용자만 이용할 수 있습니다.</TitleWrapper>
          <ContentWrapper>로그인하시고 다시 이용해주세요.</ContentWrapper>
          <ContentWrapper>혹시 로그인하셨다면, 입력하신 정보가</ContentWrapper>
          <ContentWrapper>
            정확한지 다시 한번 확인해 주시기 바랍니다.
          </ContentWrapper>
          <br />
          <BtnContainer>
            <Button
              title="로그인"
              buttonType="black"
              onClick={() => navigate('/login')}
            />
            <Button
              title="홈으로"
              buttonType="black"
              onClick={() => navigate('/')}
            />
          </BtnContainer>
        </BodyContainer>
      )}
    </div>
  );
}
