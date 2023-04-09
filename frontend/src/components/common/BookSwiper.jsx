import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../components/common/swiperStyles.css';
import { useEffect, useState } from 'react';

import tw, { styled } from 'twin.macro';
import { authApi } from 'api/axios';
import requests from 'api/config';
import { useNavigate } from 'react-router-dom';

const ImgWrapper = styled.div`
  ${tw`w-fit h-fit`}
`;

// SwiperCore.use([Navigation, Pagination]);

export default function BookSwiper({ width, height }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getData = async () => {
      try {
        await authApi(requests.GET_CHALLENGES()).then((response) => {
          setBooks(response.data.discountBooks);
        });
      } catch (error) {}
    };
    getData();
  }, []);

  return (
    <Swiper
      effect={'coverflow'}
      centeredSlides={true}
      grabCursor={true}
      slidesPerView={3}
      scrollbar={{ draggable: true }}
      modules={[Autoplay, EffectCoverflow, Navigation]}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 10, // 회전각도
        stretch: 0,
        depth: 100, // 깊이감도
        modifier: 2, //
        slideShadows: true, //선택한 부분 밝게 나머지는 그늘지게 해준다.
      }}
      style={{
        width: '80%',
      }}
    >
      <div>
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <ImgWrapper>
              <img
                src={book.coverImg}
                alt=""
                style={{
                  borderRadius: 10,
                  height: '400px',
                }}
                onClick={() => navigate(`/books/${userId}/${book.bookId}`)}
              />
            </ImgWrapper>
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}
