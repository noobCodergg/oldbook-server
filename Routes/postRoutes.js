const express = require("express");
const { post, getPost, postLike, postComment, getNotification, getOnePost } = require("../Controllers/posts");
const {verifyToken} = require('../Middlewares/verify')


const router = express.Router();

router.post('/post',verifyToken,post)
router.get('/get-posts',verifyToken,getPost)
router.put('/post-like/:postId',verifyToken,postLike)
router.put('/post-comment/:postId',verifyToken,postComment)
router.get('/get-notification/:userId',verifyToken,getNotification)
router.get('/get-one-post/:postId',verifyToken,getOnePost)


module.exports = router;