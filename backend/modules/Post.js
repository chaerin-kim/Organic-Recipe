const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: String,
  },
  { timestamps: true } //createdAt, updatedAt 장동생성
  // { versionKey: false }  __v 사용하지 않을때
);

const PostModel = model('Post', PostSchema);
module.exports = PostModel;
