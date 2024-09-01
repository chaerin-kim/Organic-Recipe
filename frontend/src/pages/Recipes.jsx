import { useEffect, useState } from 'react';

import PostCard from '../components/PostCard';

import { url } from '../store/ref';

const Recipes = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(`${url}/postList`)
      .then((res) => res.json())
      .then((data) => setPostList(data))
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      <main className="mw mainList">
        <p className="subTitle">NEW RECIPES</p>

        <div className="postsCon">
          {postList.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Recipes;
