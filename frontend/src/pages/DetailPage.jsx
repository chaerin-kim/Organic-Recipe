import { useNavigate, useParams } from 'react-router-dom';
import { url } from '../store/ref';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsArea from '../components/CommentsArea';
import '../styles/DetailPage.scss';

const DetailPage = () => {
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;
  const navigate = useNavigate();

  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState();

  useEffect(() => {
    fetch(`${url}/postDetail/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => setPostInfo(data));
  }, [postId]);

  const date = new Date(postInfo?.createdAt);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const editPost = () => {
    navigate(`/edit/${postId}`);
  };

  const deletePost = () => {
    fetch(`${url}/deletePost/${postId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'ok') {
          navigate('/');
        }
      });
  };

  // console.log('postinfo', postInfo);

  return (
    <main className="mw detail">
      <h2>{postInfo?.title}</h2>

      <section>
        <div className="info">
          <p className="author">{postInfo?.author}</p>
          <p>
            작성일: {day} / {time}
          </p>
        </div>

        <div className="bgImg">
          <img src={`${url}/${postInfo?.cover}`} alt={postInfo?.title} />
        </div>

        <div className="summaryCon">
          <p className="summaryTitle">SUMMARY</p>
          <p className="summary">{postInfo?.summary}</p>
        </div>

        <div
          className="desc"
          dangerouslySetInnerHTML={{ __html: postInfo?.content }}
        />
      </section>

      <section className="contentBtns">
        {userName === postInfo?.author && (
          <>
            <button onClick={editPost} className="btn-secondary editBtn">
              수정
            </button>
            <button onClick={deletePost} className="btn-secondary">
              삭제
            </button>
          </>
        )}
      </section>

      <CommentsArea
        userName={userName}
        postId={postId}
        className="CommentsCon"
      />
    </main>
  );
};

export default DetailPage;
