import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Search from '../components/Search';
import { url } from '../store/ref';

// debounce 함수 구현
const debounce = (func, delay) => {
  let timer;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Recipes = () => {
  const [postList, setPostList] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]); 

  useEffect(() => {
    fetch(`${url}/postList`)
      .then((res) => res.json())
      .then((data) => setPostList(data))
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // 검색 자동완성 기능
  const autoComplete = (e) => {
    const currentValue = e.target.value;
    setSearchTerm(currentValue);

    if (currentValue === '') {
      setFilteredItem([]);
    } else {
      const filtered = postList
        .filter((item) =>
          item.title.toLowerCase().includes(currentValue.toLowerCase())
        )
        .sort((a, b) => a.title.localeCompare(b.title));

      setFilteredItem(filtered);
    }
  };

  // 500ms 이후에 autoComplete 함수 실행하도록 debounce 적용
  const debouncedAutoComplete = debounce(autoComplete, 500);

  // 아이템 선택 시 해당 게시물만 보여줌
  const handleSelect = (postId) => {
    const selected = postList.find((post) => post._id === postId);
    setSelectedPosts([selected]); 
    setFilteredItem([]);
    setSearchTerm('');
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 || e.type === 'click') { // Enter키 혹은 아이콘 버튼 클릭 시
      if (filteredItem.length > 0) {
        setSelectedPosts(filteredItem);
        setFilteredItem([]);
        setSearchTerm(''); 
      }
    }
  };

  return (
    <div>
      <main className="mw mainList">
        <Search
          autoComplete={debouncedAutoComplete} // debounce 적용
          filteredItem={filteredItem}
          searchTerm={searchTerm}
          onSelect={handleSelect}
          handleEnter={handleEnter} 
        />

        <p className="subTitle">NEW RECIPES</p>

        <div className="postsCon">
          {/* 검색된 게시물이 있으면 해당 게시물만, 아니면 전체 게시물을 보여줌 */}
          {selectedPosts.length > 0 ? (
            selectedPosts.map((post) => <PostCard key={post._id} post={post} />)
          ) : (
            postList.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default Recipes;
