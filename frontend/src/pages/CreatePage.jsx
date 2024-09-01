import { useState } from 'react';
import style from '../css/CreatePage.module.css';
import Editor from './Editor';
import { url } from '../store/ref';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [content, setContent] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const [summaryError, setSummaryError] = useState('');
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    if (title === '') {
      setMessage1('제목을 입력해 주세요');
      document.getElementById('title').focus();
      return;
    } else {
      setMessage1('');
    }
    if (summary === '') {
      setMessage2('요약내용을 입력해주세요');
      document.getElementById('summary').focus();
      return;
    } else {
      setMessage2('');
    }
    if (files === '') {
      setMessage3('썸네일 이미지가 필요해요');
      document.getElementById('files').focus();
      return;
    } else {
      setMessage3('');
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.append('content', content);

    data.append('files', files[0]);

    // 백엔드로 데이터를 전송하는 부분
    const response = await fetch(`${url}/postWrite`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      navigate('/');
    }
  };

  const handleSummaryChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 100) {
      setSummaryError('요약 내용은 100글자를 초과할 수 없습니다.');
    } else {
      setSummaryError('');
      setSummary(inputValue);
    }
  };

  return (
    <main className="mw">
      <h2>Write a Post</h2>
      <form className={style.writeCon} onSubmit={createNewPost}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>&nbsp;{message1}</p>

        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          name="summary"
          id="summary"
          placeholder="요약내용을 입력해 주세요"
          value={summary}
          onChange={handleSummaryChange}
        />
        <p style={{ color: 'red', fontSize: '1.2rem' }}>&nbsp;{summaryError}</p>
        <p>&nbsp;{message2}</p>

        <label htmlFor="files">Attachments</label>
        <input
          type="file"
          name="files"
          id="files"
          onChange={(e) => setFiles(e.target.files)}
        />
        <p>&nbsp;{message3}</p>

        <label htmlFor="content">Content</label>
        <Editor content={content} setContent={setContent} />
        <button className={`${style.submit} btn-secondary`}>포스트 등록</button>
      </form>
    </main>
  );
};
export default CreatePage;
