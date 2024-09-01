import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
// 스와이퍼
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { url } from '../store/ref';

const MainListPage = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(`${url}/postList`)
      .then((res) => res.json())
      .then((data) => setPostList(data));
  }, []);

  // console.log(postList);
  return (
    <main className="mw mainList">
      
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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
      <h2>블로그 리스트 & 메인페이지</h2>
      <div className="postsCon">
        {postList.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default MainListPage;
