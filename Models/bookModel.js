const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  seller:String,
  title:String,
  author:String,
  price:String,
  condition:String,
  image:String,
  status:Boolean
});

const Book = mongoose.model("books", bookSchema);

module.exports = Book;