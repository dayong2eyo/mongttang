import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import '../../assets/slick-theme.css';
import '../../assets/slick.css';
import '../../components/common/Leaves.css';

import tw, { styled, css } from 'twin.macro';
import { authApi } from 'api/axios';
import requests from 'api/config';
import { useParams } from 'react-router-dom';

// import { bookImg } from 'api/data';

const PageContainer = styled.div`
  ${tw`flex justify-center`}
`;

const PageWrapper = styled.div`
  ${tw`fixed`}
`;

const ViewContainer = styled.div`
  ${tw`flex justify-center`}
`;

const BarWrapper = styled.div`
  ${tw`m-0 pr-1`}
`;

const BtnContainer = styled.div`
  ${tw`flex justify-end space-x-1 m-0 p-2`}
`;
const BtnWrapper = styled.div`
  ${tw`w-fit h-[24px] p-1 py-[12px] bg-btnBlack text-whiteText text-sub-bold rounded-full flex justify-center items-center shadow cursor-pointer`}
`;

//이미지 슬라이드
const ImgSlide = ({ key, src, mode }) => {
  if (mode === 1) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '65vw',
          // zIndex: 50,
          height: '80vh',
        }}
      >
        <img src={src} alt={key} />
      </div>
    );
  } else if (mode === 2) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          // width: '65vw',
          // zIndex: 50,
          height: '80vh',
        }}
      >
        <img src={src} alt={key} />
      </div>
    );
  }
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundColor: '#807E89' }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundColor: '#807E89' }}
      onClick={onClick}
    />
  );
};

function BookViewer() {
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [modeStatus, setModeStatus] = useState(false); //페이지 모드
  const [rtl, setRtl] = useState(false); //rtl 모드
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [bookImg, setBookImg] = useState();

  const params = useParams();
  const bookId = params.bookId;

  const slider = useRef();

  const slidePlay = () => {
    slider.current.slickPlay();
  };

  const slidePause = () => {
    slider.current.slickPause();
  };
  useEffect(() => {
    const fetchBookImg = async () => {
      try {
        await authApi
          .get(requests.GET_BOOK_IMAGES(bookId))
          .then((res) => setBookImg(res.data.illustes));
      } catch (error) {
        throw error;
      }
    };
    fetchBookImg();
  }, [bookId]);

  useEffect(() => {
    if (modeStatus) setSlidesToShow(1);
    else setSlidesToShow(2);
  }, [modeStatus, rtl]);

  // console.log(bookImg);

  const settings = {
    dots: false, //페이징용 도트
    // fade: true, //페이드
    lazyLoad: false, //레이지로딩
    infinite: false, //무한반복 옵션
    // vertical: true, //수직 모드
    // verticalSwiping: true, //수직 스크롤링 옵션
    // focusOnSelect: true, //클릭 시 해당 화면을 현재화면으로
    rtl: rtl, //Right to Left
    beforeChange: function (currentSlide, nextSlide) {
      setSlideIndex(nextSlide);
    },
    afterChange: function (currentSlide) {
      setUpdateCount(updateCount + 1);
    },
    speed: 500, //넘어가는 속도(클수록 느림)
    slidesToShow: slidesToShow, //한번에 보이는 페이지 수
    slidesToScroll: 1, //한번에 넘어가는 페이지 수(잘 안됨)
    autoplay: true, //자동재생 옵션
    autoplaySpeed: 1000, //자동재생 시간(클수록 늦게 넘어감)
    // centerMode: true,
    centerPadding: 0, //다른 슬라이드 보이기 싫으면 0
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    mode: slidesToShow,
  };

  //화면 모드에 따른 옵션세팅을 따로 정리해서 임포트해오는 것도 고려
  //1단, 2단, 스크롤

  return (
    <PageContainer>
      <PageWrapper>
        <ViewContainer>
          <Slider ref={slider} {...settings}>
            {bookImg !== undefined
              ? bookImg.map((illuste, idx) => {
                  return (
                    // <ImgSlide
                    //   src={illuste.illustePath}
                    //   key={illuste.pageNo}
                    //   mode={settings.mode}
                    // />
                    <img src={illuste.illustePath} key={idx} alt="" />
                  );
                })
              : null}
          </Slider>
        </ViewContainer>
        <BtnContainer>
          {bookImg !== undefined ? (
            <BarWrapper>
              <input
                onChange={(e) => slider.current.slickGoTo(e.target.value)}
                value={slideIndex}
                type="range"
                min={0}
                max={bookImg.length - 1}
                style={{
                  width: '25vw',
                }}
              />{' '}
              {!rtl
                ? slideIndex + 1 + '/' + bookImg.length
                : bookImg.length - slideIndex + '/' + bookImg.length}
            </BarWrapper>
          ) : null}

          <BtnWrapper>
            {modeStatus ? (
              <button onClick={() => setModeStatus(!modeStatus)}>2단</button>
            ) : (
              <button onClick={() => setModeStatus(!modeStatus)}>1단</button>
            )}
          </BtnWrapper>
          <BtnWrapper>
            <button onClick={slidePlay}>재생</button>
          </BtnWrapper>
          <BtnWrapper>
            <button onClick={slidePause}>중지</button>
          </BtnWrapper>
          <BtnWrapper>
            {rtl ? (
              <button onClick={() => setRtl(!rtl)}>왼쪽부터 읽기</button>
            ) : (
              <button onClick={() => setRtl(!rtl)}>오른쪽부터 읽기</button>
            )}
          </BtnWrapper>
        </BtnContainer>
      </PageWrapper>
    </PageContainer>
  );
}

export default BookViewer;
