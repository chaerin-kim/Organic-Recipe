import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import '../styles/MainListPage.scss';
import '../styles/App.scss';
import Slide from '../components/Slide.jsx';
import SpecialtySlide from '../components/SpecialtySlide.jsx';
import shareRecipeIMG from '../assets/MainListPage/shareRecipe/cooking.png';

import { url } from '../store/ref';

const MainListPage = () => {
  const [postList, setPostList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url}/postList`)
      .then((res) => res.json())
      .then((data) => setPostList(data))
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // console.log(postList);
  

  return (
    <>
      {/* 메인 슬라이드 */}
      <Slide />

      {/* NEW RECIPES 섹션 */}
      <main className="mw mainList">
        <p className="subTitle">NEW RECIPES</p>

        <div className="postsCon">
          {postList.slice(0, 6).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <button
          className="btn-primary more"
          onClick={() => navigate('/recipes')}
        >
          View More &gt;
        </button>
      </main>

      {/* specialty 섹션 */}
      <section className="specialty">
        <div className="spcialtyTitle">
          <h2>
            Today's <br />
            <p className="h1">Specialty</p>
          </h2>
        </div>
        <div className="specialtyCon">
          <SpecialtySlide />
        </div>
      </section>

      {/* shareRecipe 섹션 */}
      <section className="shareRecipe ">
        <div className="mw shareCon">
          <div className="shareTxt">
            <h2>Share Your Favorite Recipes!</h2>
            <p>
              Are you passionate about cooking and have a go-to recipe?
              <br />
              We'd love to hear about it! <br />
              Please share your recipe, to help others discover new flavors.
              <br />
              Let’s spread the joy of cooking together!
            </p>
            <button
              className="btn-primary more"
              onClick={() => navigate('/create')}
            >
              Go to POST &gt;
            </button>
          </div>
          <img src={shareRecipeIMG} alt="shareRecipe" />
        </div>
      </section>

      {/* mealKit 섹션 */}
      <section className="mealKit ">
        <div className="mw mealKitCon">
          <h2>
            If you want to eat the food in the recipe, <br />
            <p className="h1">order a meal kit.</p>
          </h2>
          <div className="mealKitTxt">
            <p>
              Get fresh ingredients and simple instructions delivered to your
              door.
              <br /> Enjoy the taste of homemade meals without the hassle of
              shopping or prep.
            </p>
          </div>
          <button
            className="btn-primary more"
            onClick={() => navigate('/Commingsoon')}
          >
            Coming Soon...
          </button>
        </div>
      </section>
    </>
  );
};

export default MainListPage;
