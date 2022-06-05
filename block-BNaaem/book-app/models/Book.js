var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var bookSchema = new Schema(
  {
    isbn: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    publish_date: { type: Date, required: true },
    publisher: { type: String, required: true },
    numOfPages: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
