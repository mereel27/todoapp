import 'swiper/css';
import 'swiper/css/pagination';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

export default function TextCarousel() {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  return (
    <>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        id="mySwiper"
      >
        <SwiperSlide>
          <Typography
            paragraph
            sx={{
              margin: '40px auto 0 auto',
              fontFamily: 'Raleway',
              width: '285px',
              minHeight: '46px',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            Very simple Things To-Do List. Helps you to manage yourdaily life,
            without any hassle!
          </Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography
            paragraph
            sx={{
              margin: '40px auto 0 auto',
              height: '46px',
              fontFamily: 'Raleway',
              width: '285px',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            Text2
          </Typography>
        </SwiperSlide>
        <SwiperSlide>
          <Typography
            paragraph
            sx={{
              margin: '40px auto 0 auto',
              height: '46px',
              fontFamily: 'Raleway',
              width: '285px',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            Text3
          </Typography>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
