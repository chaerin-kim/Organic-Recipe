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

  // 전체 리스트 가져와서 보여주기
  useEffect(() => {
    fetch(`${url}/postList`)
      .then((res) => res.json())
      .then((data) => setPostList(data))
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // 검색 자동완성 기능 (백엔드에서 검색 처리)
  const autoComplete = async (e) => {
    const currentValue = e.target.value;
    setSearchTerm(currentValue);
  
    if (currentValue === '') {
      setFilteredItem([]);
    } else {
      try {
        // 백엔드 검색 API 호출
        const response = await fetch(`${url}/postList/search?query=${currentValue}`);
        const data = await response.json();
        setFilteredItem(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  // debounce 적용 (500ms 딜레이)
  const debouncedAutoComplete = debounce(autoComplete, 500);

  // 아이템 선택 시 해당 게시물만 보여줌
  const handleSelect = (postId) => {
    const selected = filteredItem.find((post) => post._id === postId); 
    setSelectedPosts([selected]); 
    setFilteredItem([]);
    setSearchTerm('');
  };

  // Enter 키 입력 및 검색 아이콘 클릭 시 필터된 항목을 선택
  const handleEnter = (e) => {
    if (e.keyCode === 13 || e.type === 'click') { // Enter키 또는 버튼 클릭 시
      if (filteredItem.length > 0) {
        setSelectedPosts(filteredItem); // 검색된 모든 항목 보여줌
        setFilteredItem([]);
        setSearchTerm('');
      }
    }
  };

  return (
    <div>
      <main className="mw mainList">
        <Search
          autoComplete={debouncedAutoComplete} // debounce 적용된 검색 함수
          filteredItem={filteredItem}
          searchTerm={searchTerm}
          onSelect={handleSelect}
          handleEnter={handleEnter} // Enter 키 핸들러 및 버튼 클릭 핸들러
        />

        <p className="subTitle">NEW RECIPES</p>

        <div className="postsCon">
          {/* 검색된 게시물이 있으면 해당 게시물만, 아니면 전체 게시물 */}
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
