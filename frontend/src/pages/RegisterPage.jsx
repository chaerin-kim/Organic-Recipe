import { Link } from 'react-router-dom';
// import style from '../css/RegisterPage.module.css';
import '../styles/LoginPage.scss';
import { useState } from 'react';
import { url } from '../store/ref.js';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [pdcon, setPdcon] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');

  const register = async (e) => {
    e.preventDefault();
    // console.log(username, password);

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
    if (password !== pdcon) {
      setMessage3('비밀번호가 같지 않습니다.');
      return;
    } else {
      setMessage3('');
    }

    //백엔드로 POST 요청 및 응답
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      body: JSON.stringify({ username, userID, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.status === 200) {
      //회원가입 성공 후 로그인 페이지로 이동
      window.location.href = '/login';
    } else {
      alert('존재하는 아이디 입니다.');
    }
  };

  return (
    <main className={`mw register`}>
      <h1>Register</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="사용자이름"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

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
        <input
          type="password"
          placeholder="패스워드확인"
          value={pdcon}
          onChange={(e) => {
            setPdcon(e.target.value);
          }}
        />
        <span>{message3}</span>
        <button type="submit"  className="btn-secondary">Register</button>
      </form>

      <div className="registerBox">
        <p> Already registered? Click here to</p>
        <button className="btn-primary"><Link to="/login">Sign in</Link></button>
      </div>

    </main>
  );
};

export default RegisterPage;
