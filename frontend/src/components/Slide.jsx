import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// 이미지 임포트
import slide1 from '../assets/MainListPage/mainSlide/Slide2.png';
import slide2 from '../assets/MainListPage/mainSlide/Slide3.png';
import slide3 from '../assets/MainListPage/mainSlide/Slide4.png';
import slide4 from '../assets/MainListPage/mainSlide/Slide1.png';

// m-slide 이미지 임포트

import mSlide1 from '../assets/MainListPage/mainSlide/m-slide2.png';
import mSlide2 from '../assets/MainListPage/mainSlide/m-slide3.png';
import mSlide3 from '../assets/MainListPage/mainSlide/m-slide4.png';
import mSlide4 from '../assets/MainListPage/mainSlide/m-slide1.png';

const Slide = () => {
  const [slidesContent, setSlidesContent] = useState([]);
  const [isMobile, setIsMobile] = useState(false); // 모바일 여부 상태 추가

  useEffect(() => {
    const updateSlides = () => {
      const MobileView = window.innerWidth <= 1000;
      setIsMobile(MobileView);

      if (MobileView) {
        setSlidesContent([
          {
            image: mSlide1,
            title: 'Organic Market',
            frameClass: 'slide1',
          },
          {
            image: mSlide2,
            title: 'Pumpkin Soup',
            frameClass: 'slide2',
          },
          {
            image: mSlide3,
            title: 'Greek Yogurt & Nuts',
            frameClass: 'slide3',
          },
          {
            image: mSlide4,
            title: 'Strawberry Crepe',
            frameClass: 'slide4',
          },
        ]);
      } else {
        setSlidesContent([
          {
            image: slide1,
            category: 'INGREDIENT',
            title: 'Organic Market',
            description:
              'Explore the vibrant colors and fresh produce at our local organic market. From farm-fresh vegetables to artisanal goods, discover the best ingredients for your recipes.',
            frameClass: 'slide1',
          },
          {
            image: slide2,
            category: 'FOOD',
            title: 'Pumpkin Soup',
            description:
              'A warm, comforting bowl of pumpkin soup made with organic pumpkins, a hint of spice, and creamy coconut milk. Ideal for cozy autumn evenings.',
            frameClass: 'slide2',
          },
          {
            image: slide3,
            category: 'DESSERT',
            title: 'Greek Yogurt & Nuts',
            description:
              'Rich, creamy Greek yogurt topped with a drizzle of honey and a sprinkle of crunchy nuts. A simple yet satisfying dessert or snack.',
            frameClass: 'slide3',
          },
          {
            image: slide4,
            category: 'DESSERT',
            title: 'Strawberry Crepe',
            description:
              'Freshly made crepes filled with ripe strawberries and a touch of powdered sugar. Perfect for a light dessert or an indulgent breakfast.',
            frameClass: 'slide4',
          },
        ]);
      }
    };

    window.addEventListener('resize', updateSlides);
    updateSlides(); // 초기 렌더링 시 실행

    return () => window.removeEventListener('resize', updateSlides); 
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {slidesContent.map((slide, index) => (
        <SwiperSlide key={index} className={slide.frameClass}>
          <div className="slideContent">
            <img
              className="slideImg"
              src={slide.image}
              alt={`Slide ${index + 1}`}
            />
            <div className="textOverlay">
              {!isMobile && slide.category && (
                <h5 className="category">{slide.category}</h5>
              )}
              <h1>{slide.title}</h1>
              {!isMobile && slide.description && (
                <p className="desc">{slide.description}</p>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
