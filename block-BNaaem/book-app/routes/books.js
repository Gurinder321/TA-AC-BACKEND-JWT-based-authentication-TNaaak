var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');
var Book = require('../models/Book');

router.post('/', auth.verifyToken, async (req, res, next) => {
  try {
    var book = await Book.create(req.body);
    res.status(201).json({ book });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    var books = await Book.find({});
    res.status(201).json({ books });
  } catch (error) {
    next(error);
  }
});

router.get('/:isbn', auth.verifyToken, async (req, res, next) => {
  var isbn = req.params.isbn;
  try {
    var books = await Book.find({});
    for (let book of books) {
      if (book.isbn === isbn) {
        return res.json(book);
      } else {
        res.status(404).send('Book not found');
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:isbn', auth.verifyToken, async (req, res, next) => {
  var isbn = req.params.isbn;
  var books = await Book.find({});
  try {
    books.filter((i) => {
      if (i.isbn === isbn) {
        return res.json({ message: 'Book is deleted' });
      } else {
        res.status(404).send('Book not found');
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/:isbn', auth.verifyToken, async (req, res, next) => {
  var isbn = req.params.isbn;
  var newBook = req.body;
  var books = await Book.find({});
  try {
    for (let i = 0; i < books.length; i++) {
      let book = books[i];
      if (book.isbn === isbn) {
        books[i] = newBook;
      }
    }
    return res.send('Book is edited');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
