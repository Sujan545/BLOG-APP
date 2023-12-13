const express = require('express')
const router=express.Router()
const {
    registerUser,
    loginUser,
    logoutUser,
    refetchUser,
}=require ('../controllers/authController')

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/logout",logoutUser)
router.get("/refetch",refetchUser)

module.exports=router