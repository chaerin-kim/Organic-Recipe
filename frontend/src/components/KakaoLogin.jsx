import { useEffect } from 'react';

// 카카오 로그인
const client_id = 'f65dbab13ce0e288353d738bac59809b'; //appKey
const redirect_uri = 'http://localhost:3000';
const response_type = 'code';

const KakaoLogin = () => {
  // 백엔드가 있는 경우 : 백엔드에서 카카오 호출 하는 api

  // 카카오로부터 값을 받으면 /code=어쩌고~ 형태로 옴
  // => 카카오로부터 인가 코드 받은 것으로 판단
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const code = search.get('code');
    console.log('현재 URL:', window.location.href);
    console.log('인가 코드:', code);
    // 카카오로부터 리다이렉트 당한 경우 code 가 있겠지
    if (code) {
      handleGetToken(code); // code를 인자로 전달
    }
  }, []);

  const handleGetToken = async (code) => {
    console.log('토큰 요청을 처리합니다.', code);
    try {
      const response = await fetch(`http://localhost:8001/oauth/kakao/callback?code=${code}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        console.log('카카오 로그인 성공');
      } else {
        console.error('카카오 로그인 실패:', response.statusText);
      }
    } catch (error) {
      console.error('카카오 로그인 요청 중 오류 발생:', error);
    }
  };

  const authParam = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
  });

  return (
    <div>
      <a
        type="button"
        href={`https://kauth.kakao.com/oauth/authorize?${authParam.toString()}`}
      >
        카카오
      </a>
    </div>
  );
};

export default KakaoLogin;
