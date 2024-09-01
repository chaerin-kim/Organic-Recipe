import style from '../css/CommentsArea.module.css';
import CommentsLi from './CommentsLi';
import { url } from '../store/ref';
import { useCallback, useEffect, useState } from 'react';

// 1-5 댓글 리스트를 불러옴 api get
// 1-6 댓글 input 영역 초기화
// 1-7 <CommentsLi /> 바인딩 처리

const CommentsArea = ({ userName, postId }) => {
  const [comments, setComments] = useState();
  const [editingCommentId, setEditingCommentId] = useState(null);

  const fetchComments = useCallback(async () => {
    fetch(`${url}/commentList/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => setComments(data));
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 댓글 등록
  const commentAdd = async () => {
    const content = document.getElementById('content').value;

    const data = new FormData();
    data.set('postId', postId);
    data.set('content', content);

    console.log(data);

    const response = await fetch(`${url}/commentAdd`, {
      method: 'POST',
      body: data,
      credentials: 'include', // 쿠키 활용할 때
    });
    console.log(response);
    if (response.ok) {
      console.log('댓글입력완료가 되면 db 호출함수 재실행');
      await fetchComments();
      document.getElementById('content').value = '';
      document.getElementById('content').focus();
    }
  };

  return (
    <section className={style.commentsArea}>
      <p className="subTitle">COMMENTS</p>
      {userName ? (
        <div className={`${style.commentArea}`}>
          <textarea name="content" id="content"></textarea>
          <button
            onClick={commentAdd}
            className={`btn-secondary ${style.submitBtn}`}
          >
            SUBMIT
          </button>
        </div>
      ) : (
        <p className={style.commentInfo}>
          로그인 하면 댓글을 등록할 수 있습니다.
        </p>
      )}

      <hr />
      <ul>
        {comments?.map((comment) => {
          return (
            <CommentsLi
              key={comment._id}
              comment={comment}
              userName={userName}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              fetchComments={fetchComments}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default CommentsArea;
