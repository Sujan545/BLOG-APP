const express = require("express");
const router = express.Router();
const verifyToken=require('../verifyToken')
const {
    createPost,
    updatePost,
    deletePost,
    getPostDetails,
    getAllPosts,
    getUserPost,
}= require('../controllers/postControllers')

router.post("/create",verifyToken,createPost)
router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,deletePost)
router.get("/:id",getPostDetails)
router.get("/",getAllPosts)
router.get("/user/:userId",getUserPost)

module.exports=router