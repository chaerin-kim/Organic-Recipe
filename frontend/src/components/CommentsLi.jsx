import { useState } from 'react';
import style from '../css/CommentsLi.module.css';
import { url } from '../store/ref';
// V 2-1 댓글 수정하기 버튼을 클릭하면 수정 input 란이 등장
// V 2-1-2 input 영역에  기존 댓글이 입력된 상태로 등장
// 2-2 기존 ui 안보이게
// 2-3 input 영역에 기존 댓글 입력된 상태로

// 3-1 수정작성완료 버튼을 클릭하면 put 요청됨, api 백엔드 개발
// 3-2 취소 버튼을 클릭하면 이전 상태로 돌감. (기존 리스트 보여짐 state로 변경)
// 3-3 다른 취소 버튼을 클릭하면 모든 .editCon는 이전 상태로 돌아감 ( state로 변경)
const CommentsLi = ({
  comment,
  userName,
  editingCommentId,
  setEditingCommentId,
  fetchComments,
}) => {
  // 상위컨포넌트로 이동
  //   const [editingCommentId, setEditingCommentId] = useState(null);
  const [updateComment, setUpdateComment] = useState('');
  const day = new Date(comment.updatedAt);
  const date = day.toLocaleDateString();

  const editComment = (e) => {
    //수정버튼을 클릭할 때 수정 폼이 보여지는 함수
    // 수정버튼을 클릭한 댓글의 ID 값을 state 정보로 활용
    setEditingCommentId(e.target.parentNode.parentNode.dataset.id);
    setUpdateComment(e.target.parentNode.querySelector('p').textContent);
  };
  const deleteComment = async () => {
    const response = await fetch(`${url}/deleteComment/${comment._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setEditingCommentId(null);
      fetchComments();
    }
  };

  const editCommentUpdate = async () => {
    const response = await fetch(`${url}/editCommentUpdate/${comment._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: updateComment,
      }),
    });
    if (response.ok) {
      console.log('수정완료');
      setEditingCommentId(null);
      fetchComments();
    }
  };
  // 삭제기능
  const cancleCommentUpdate = () => {
    setEditingCommentId(null);
  };

  return (
    <li data-id={comment._id}>
      {editingCommentId === comment._id ? (
        <div className={style.editCon}>
          <textarea
            name="content"
            id={comment._id}
            value={updateComment}
            onChange={(e) => {
              setUpdateComment(e.target.value);
            }}
          ></textarea>
          <button onClick={editCommentUpdate}>수정진짜완료</button>
          <button onClick={cancleCommentUpdate}>취소</button>
        </div>
      ) : (
        <div className={style.list}>
          <span className={style.authorInfo}>
            <p className={style.author}>{comment.author}</p>
            <p className={style.date}>{date}</p>
          </span>
          <p className={style.content}>{comment.content}</p>

          {userName === comment.author ? (
            <div>
              <button className={`${style.btnSecondary}`} onClick={editComment}>
                수정
              </button>
              <button
                className={`${style.btnSecondary}`}
                onClick={deleteComment}
              >
                삭제
              </button>
            </div>
          ) : (
            <div className={style.listBtns}>
              <button
                disabled
                className={`${style.btnSecondary} ${style.disabled}`}
              >
                댓글 수정
              </button>
              <button
                disabled
                className={`${style.btnSecondary} ${style.disabled}`}
              >
                댓글 삭제
              </button>
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default CommentsLi;
