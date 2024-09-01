import '../styles/LoginPage.scss';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserAllInto } from '../store/userStore'; // 리덕스 액션 임포트
import { url } from '../store/ref';

const LoginPage = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // 리덕스 디스패치 사용

  const login = async (e) => {
    e.preventDefault();
    console.log(userID, password);

    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(userID)) {
      setMessage1('아이디는 4자 이상이어야 하며 영어로 시작해야 합니다.');
      return;
    } else {
      setMessage1('');
    }
    if (password.length < 4) {
      setMessage2('4자 이상이어야 합니다.');
      return;
    } else {
      setMessage2('');
    }

    const response = await fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify({ userID, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const data = await response.json();
    console.log(data);

    if (data.id) {
      // 로그인 성공 시 유저 정보를 리덕스에 저장
      dispatch(setUserAllInto(data));
      setRedirect(true);
    }
    if (data.message === 'nouser') {
      setMessage1('사용자가 없습니다.');
    }
    if (data.message === 'failed') {
      setMessage2('비밀번호가 맞지 않습니다.');
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className={`mw register`}>
      <h1>Sign in</h1>

      <form onSubmit={login}>
        <input
          type="text"
          placeholder="아이디"
          value={userID}
          onChange={(e) => {
            setUserID(e.target.value);
          }}
        />
        <span>{message1}</span>
        <input
          type="password"
          placeholder="패스워드"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <span>{message2}</span>
        <button type="submit" className="btn-secondary">
          Sign in
        </button>
        <div className="socialLogin">{/* <KakaoLogin/> */}</div>
      </form>

      <div className="registerBox">
        <p>Not a member yet? Click here to</p>
        <button className="btn-primary" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </main>
  );
};

export default LoginPage;
