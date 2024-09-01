//mongoose랑 연결된 Post 관련 스키마 만들기
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  //ERD 만들기
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: String,
    createdAt: Date,
    updatedAt: Date,
  }
  // { timestamps: true }
  // __v : 몽고디비에서 업데이트 관련 기록해 놓는거임 -> {versionKey : false} =사용하고 싶지 않을때

);


//PostSchema 에 저장 전에
PostSchema.pre('save', function () {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 9); //한국시간으로 맞추기
  this.createdAt = currentDate;
  if (!this.createdAt) this.createdAt = currentDate; // 시간 없으면 현재시간으로 넣기!
  next(); // 다음 함수 실행
});

const PostModel = model('Post', PostSchema);
module.exports = PostSchema;
