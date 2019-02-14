const Book = require("../models/Books/Book");
const submissions = require('../core/submissions');
module.exports = {
  addGet: (req, res) => {
    res.render("books/add");
  },
  addPost: async (req, res) => {
    try {
      let book = req.body;
      let bookAdded = await Book.create(book);
      res.redirect('/books/list');
    } catch (error) {
        console.log(error);
    }
  },
  listGet: async (req, res) => {
    try {
      let books = await Book.find();
      res.render("books/list", { books });
    } catch (error) {
      console.log(error);
    }
  },
  listPost: (req, res) => {},
  submitTest: async (req,res) =>{
    let book = await Book.findOne();
    submissions.books(book);
  }
};
