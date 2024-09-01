import React, { useState } from 'react';
import { Virtual, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../styles/MainListPage.scss';

const SpecialtySlide = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(4.5);

  const updateSlidesPerView = () => {
    if (window.innerWidth <= 360) {
      setSlidesPerView(1);
    } else if (window.innerWidth <= 680) {
      setSlidesPerView(1.5);
    } else if (window.innerWidth <= 760) {
      setSlidesPerView(2);
    } else if (window.innerWidth <= 1020) {
      setSlidesPerView(2.5);
    } else if (window.innerWidth <= 1460) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(4.5);
    }
  };

  React.useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);

  const slides = [
    {
      id: 1,
      title: 'Greenery Salad',
      image: require('../assets/MainListPage/specialtySlide/specialty1.png'),
    },
    {
      id: 2,
      title: 'Egg Avocado Sandwich',
      image: require('../assets/MainListPage/specialtySlide/specialty2.png'),
    },
    {
      id: 3,
      title: 'Pumpkin Soup',
      image: require('../assets/MainListPage/specialtySlide/specialty3.png'),
    },
    {
      id: 4,
      title: 'Pumpkin Soup',
      image: require('../assets/MainListPage/specialtySlide/specialty4.png'),
    },
    {
      id: 5,
      title: 'Pumpkin Soup',
      image: require('../assets/MainListPage/specialtySlide/specialty5.png'),
    },
    {
      id: 6,
      title: 'Pumpkin Soup',
      image: require('../assets/MainListPage/specialtySlide/specialty6.png'),
    },
    {
      id: 7,
      title: 'Pumpkin Soup',
      image: require('../assets/MainListPage/specialtySlide/specialty7.png'),
    },
  ];

  return (
    <>
      <Swiper
        modules={[Virtual, Pagination, Scrollbar]}
        onSwiper={setSwiperRef}
        slidesPerView={slidesPerView} 
        spaceBetween={16} 
        autoHeight={true} 
        scrollbar={{ draggable: true }}
        virtual={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} virtualIndex={index}>
            <div className="card">
              <div className="card-front">
                <img src={slide.image} alt={slide.title} className="slideImg" />
              </div>
              <div className="card-back">
                <h3 className="card-title">{slide.title}</h3>
                <a href="#">go to Recipes &gt;</a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SpecialtySlide;
