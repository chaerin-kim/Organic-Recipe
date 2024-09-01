// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// 이미지 임포트
import slide1 from '../assets/MainListPage/mainSlide/Slide1.png';
import slide2 from '../assets/MainListPage/mainSlide/Slide2.png';
import slide3 from '../assets/MainListPage/mainSlide/Slide3.png';
import slide4 from '../assets/MainListPage/mainSlide/Slide4.png';

const slidesContent = [
  {
    image: slide1,
    category: 'DESSERT',
    title: 'Strawberry Crepe',
    description:
      "Freshly made crepes filled with ripe strawberries and a touch of powdered sugar. Perfect for a light dessert or an indulgent breakfast.",
    frameClass: 'slide1',
  },
  {
    image: slide2,
    category: 'INGREDIENT',
    title: 'Organic Market',
    description:
      "Explore the vibrant colors and fresh produce at our local organic market. From farm-fresh vegetables to artisanal goods, discover the best ingredients for your recipes.",
    frameClass: 'slide2',
  },
  {
    image: slide3,
    category: 'FOOD',
    title: 'Pumpkin Soup',
    description:
      "A warm, comforting bowl of pumpkin soup made with organic pumpkins, a hint of spice, and creamy coconut milk. Ideal for cozy autumn evenings.",
    frameClass: 'slide3',
  },
  {
    image: slide4,
    category: 'DESSERT',
    title: 'Greek Yogurt & Nuts',
    description:
      "Rich, creamy Greek yogurt topped with a drizzle of honey and a sprinkle of crunchy nuts. A simple yet satisfying dessert or snack.",
    frameClass: 'slide4', // 추가적인 스타일을 원한다면 프레임 클래스
  },
];


const Slide = () => {
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
              <h5 className='category'>{slide.category}</h5>
              <h1>{slide.title}</h1>
              <p className="desc">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slide;
