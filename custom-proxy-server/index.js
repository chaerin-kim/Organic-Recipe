const http = require('http');
const { URL } = require('url');

// 백엔드 서버 설정
const BACKEND_HOST = 'localhost';
const BACKEND_PORT = 8002; // 실제 백엔드 서버 포트

// 프록시 서버 생성
const proxyServer = http.createServer((req, res) => {
  const { method, url, headers } = req;

  // 백엔드 서버로 전달할 요청 옵션 설정
  const backendUrl = new URL(url, `http://${BACKEND_HOST}:${BACKEND_PORT}`);
  const options = {
    hostname: backendUrl.hostname,
    port: backendUrl.port,
    path: backendUrl.pathname + backendUrl.search,
    method: method,
    headers: headers,
  };

  // 백엔드 서버로 요청 전송
  const backendReq = http.request(options, (backendRes) => {
    // 백엔드 응답 수신 후, 클라이언트에게 전달
    res.writeHead(backendRes.statusCode, backendRes.headers);
    backendRes.pipe(res);
  });

  // 오류 처리
  backendReq.on('error', (error) => {
    console.error('Proxy error:', error);
    res.writeHead(500);
    res.end('Internal Server Error');
  });

  // 클라이언트 요청 데이터 백엔드로 전달
  req.pipe(backendReq);
});

// 프록시 서버 실행
const PROXY_PORT = 3001;
proxyServer.listen(PROXY_PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PROXY_PORT}`);
});
