import styles from '../styles/Search.module.scss';

const Search = ({ autoComplete, filteredItem, searchTerm, onSelect, handleEnter }) => {
  return (
    <div className={styles.searchCon}>
      <input
        className={styles.search_input}
        type="text"
        onChange={(e) => autoComplete(e)}
        placeholder="Search recipes..."
        onKeyUp={(e) => handleEnter(e)} // Enter 키 입력 처리
      />
      <button type="submit" onClick={handleEnter}> 
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      {/* 검색어가 있을 때만 리스트를 보여줌 */}
      {searchTerm && (
        <ul className={styles.itemsList}>
          {filteredItem.length > 0 ? (
            filteredItem.map((item) => (
              <li
                className={styles.item}
                key={item._id}
                onClick={() => onSelect(item._id)} 
              >
                {item.title}
              </li>
            ))
          ) : (
            <li className={styles.item}>관련 검색어가 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Search;
