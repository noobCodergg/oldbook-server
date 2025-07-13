const express = require("express");
const upload = require('../Middlewares/multer')
const {uploadBook, getBooks, getBookByUser, deleteBook, getAllBooks, updateBookStatus} = require('../Controllers/books')
const {verifyToken} = require('../Middlewares/verify')

const router = express.Router();

router.post('/upload-book',upload.single("image"),uploadBook)
router.get('/get-books',verifyToken,getBooks)
router.get('/get-books-by-user/:userId',verifyToken,getBookByUser)
router.delete('/delete-book/:bookId',verifyToken,deleteBook)
router.get('/get-all-books',verifyToken,getAllBooks)
router.put('/update-book-status/:bookId',verifyToken,updateBookStatus)


module.exports = router;