const express = require("express");
const router = express.Router();
const {
    createComment,
    updateComment,
    deleteComment,
    postComment,
} = require("../controllers/commentController");
const verifyToken = require('../verifyToken')

router.post("/create",verifyToken, createComment);
router.get("/post/:postId", postComment);
router.put("/:id",verifyToken, updateComment);
router.delete("/:id",verifyToken, deleteComment);

module.exports = router;