const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const cardScheme = new mongoose.Schema({
  name: {
    type: String,
    minlebgth: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: [
      {
        type: ObjectId,
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardScheme);
