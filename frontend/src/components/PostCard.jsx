import { useNavigate } from 'react-router-dom';
import styles from '../styles/PostCard.module.scss';
import { url } from '../store/ref';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const date = new Date(post.createdAt);
  const day = date.toLocaleDateString('en-US'); // AM/PM 형식을 위해 변경
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // 12시간제 사용
    hourCycle: 'h12', // AM/PM 형식
  });

  return (
    <article
      className={styles.post}
      onClick={() => {
        navigate(`/detail/${post._id}`);
      }}
    >
      <div className={styles.postImg}>
        <img src={`${url}/${post.cover}`} alt="샘플이미지" />
      </div>
      <div className={styles.info}>
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
        <p className={styles.writerInfo}>
          <span>{post.author}</span> / <span>{day}</span> <span>{time}</span>
        </p>
      </div>
    </article>
  );
};

export default PostCard;
