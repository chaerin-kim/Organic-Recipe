const express = require('express');
const app = express();
const port = 8002;

const cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); //cors 이슈 해결

app.use(express.json());

//몽구스 연결
const mongoose = require('mongoose');
const connectUri =
  'mongodb+srv://chery5809:coflsdl5809@cluster0.e74lvkp.mongodb.net/Blog2?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(connectUri); 

const User = require('./modules/User');
const Post = require('./modules/Post');
const Comment = require('./modules/Comment');

const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = 'tslsksek'; // 환경변수로처리

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

const axios = require('axios');

// 정적파일 경로설정
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 회원가입 요청 기능
app.post('/register', async (req, res) => {
  const { username, userID, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      userID,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json({ message: 'failed', error: e.message });
  }
});

//로그인 기능
app.post('/login', async (req, res) => {
  // console.log('서버로 온', req.body);
  
  const { userID, password } = req.body;

  if (!userID || !password) {
    return res.status(400).json({ message: 'missing_fields' });
  }

  try {
    const userDoc = await User.findOne({ userID });

    if (!userDoc) {
      return res.json({ message: 'nouser' });
    }

    const passOK = await bcrypt.compare(password, userDoc.password);

    if (passOK) {
      jwt.sign({ userID: userDoc.userID, username: userDoc.username, id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'jwt_error', error: err.message });
        }
        res.cookie('token', token, { httpOnly: true }).json({
          id: userDoc._id,
          userID: userDoc.userID,
          username: userDoc.username,
        });
      });
    } else {
      res.json({ message: 'failed' });
    }
  } catch (e) {
    res.status(500).json({ message: 'server_error', error: e.message });
  }
});



// header.jsx 에서 요청한 정보
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  // console.log('token-----', token);

  if (!token) {
    return res.json('토근정보가 없습니다.');
  }

  try {
    jwt.verify(token, jwtSecret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } catch (e) {
    res.json('유효하지 않는 토큰 정보입니다.');
  }
});

//로그아웃 기능 쿠키 삭제
app.post('/logout', (req, res) => {
  res.cookie('token', '').json();
});

//postWrite
app.post('/postWrite', upload.single('files'), (req, res) => {
  console.log(req.body);
  // console.log(req.file);
  const { path, originalname } = req.file;
  const part = originalname.split('.');
  const ext = part[part.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
  // console.log(newPath);
  // 로그인 된 회원정보 가져오기 cookies
  const { token } = req.cookies;
  // console.log(token);
  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw err;
    // console.log(info.username);
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.username,
    });
    res.json(postDoc);
  });
});

// 기존 전체 게시물 리스트 가져오기
app.get('/postList', async (req, res) => {
  try {
    const postlist = await Post.find().sort({ createdAt: -1 });
    res.json(postlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// /postList/search (백엔드에서 검색 처리)
app.get('/postList/search', async (req, res) => {
  const query = req.query.query; // 쿼리 파라미터로 검색어 받음
  if (!query) {
    return res.json([]);
  }

  try {
    // 제목에 검색어가 포함된 포스트 찾기 (대소문자 구분 없이 검색)
    const filteredPosts = await Post.find({ title: { $regex: query, $options: 'i' } });
    res.json(filteredPosts);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//상세페이지 정보 요청
app.get('/postDetail/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});

//포스트 삭제 요청 기능
app.delete('/deletePost/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await Post.findByIdAndDelete(id);
  res.json({ message: 'ok' });
});

// 디테일 페이지 데이터요청 기능
app.get('/editpage/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id);
  res.json(postDoc);
});

// 디테일 페이지 수정요청 기능
app.put('/editPost/:id', upload.single('files'), (req, res) => {
  const { id } = req.params;
  let newPath = null;
  if (req.file) {
    const { path, originalname } = req.file;
    const part = originalname.split('.');
    const ext = part[part.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: '인증 토근 없음' });
  }

  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    await Post.findByIdAndUpdate(id, {
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json({ message: 'ok' });
  });
});

///commentAdd 댓글 정보를 formData로 받을 때
app.post('/commentAdd', upload.none(), (req, res) => {
  console.log(req.body);
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: '인증토큰없음' });
  }

  jwt.verify(token, jwtSecret, {}, (err, info) => {
    if (err) throw err;
    const { postId, content } = req.body;
    const commentDoc = Comment.create({
      postId,
      content,
      author: info.username,
    });
    res.json(commentDoc);
  });
});

//postId 를 기준으로 댓글 리스트 요청
app.get('/commentList/:postId', async (req, res) => {
  const { postId } = req.params;
  const commentList = await Comment.find({ postId }).sort({ createdAt: -1 });
  res.json(commentList);
});

// 댓글 삭제 기능
app.delete('/deleteComment/:id', async (req, res) => {
  const { id } = req.params;
  await Comment.findByIdAndDelete(id);
  res.json({ message: 'ok' });
});

// 댓글 수정 기능
app.put('/editCommentUpdate/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  await Comment.findByIdAndUpdate(id, { content });
  res.json();
});







app.get('/', (req, res) => {
  res.send('잘돌아감');
});
app.listen(port, () => {
  console.log(`${port}번에서 돌아감---`);
});
