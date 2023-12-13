const express = require("express");
const router = express.Router();
const verifyToken= require('../verifyToken')
const {
    updateUser,
    deleteUser,
    getUser,
}= require('../controllers/userController');

router.get("/:id",getUser);
router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)

module.exports=router