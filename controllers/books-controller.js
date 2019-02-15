const Book = require("../models/Books/Book");
const Promotion = require("../models/Books/BookPromotion");
module.exports = {
  addGet: (req, res) => {
    res.render("books/bookAdd");
  },
  addPost: async (req, res) => {
    try {
      let book = req.body;
      let bookAdded = await Book.create(book);
      res.redirect("/books/list");
    } catch (error) {
      console.log(error);
    }
  },
  listGet: async (req, res) => {
    try {
      let books = await Book.find();
      res.render("books/bookList", { books });
    } catch (error) {
      console.log(error);
    }
  },
  listPost: (req, res) => {},
  promotionsAllListGet: async (req, res) => {
    try {
      let bookPromotions = await Promotion.find().populate('book');
      res.render('books/promotionsList', {bookPromotions});
    } catch (error) {
      console.log(error);
    }
  },
  promotionsAllListPost: (req, res) => {},
  promotionAddGet: async (req, res) => {
    try {
      let books = await Book.find();
      res.render("books/promotionsAdd", { books });
    } catch (error) {
      console.log(error);
    }
  },
  promotionAddPost: async (req, res) => {
    try {
      let promotion = req.body;
      let promotionAdded = await Promotion.create(promotion);
      res.redirect("/books/promotions/list");
    } catch (error) {
      console.log(error);
    }
  }
};
