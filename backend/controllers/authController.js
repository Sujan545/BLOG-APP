const userdb = require("../models/User")
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')

const registerUser= async(req,res)=>{
const {username,email,password}=req.body
if(!username || !email || !password){
    res.status(422).json({ error: "fill all the part" })
}
    try{
        const preuser = await userdb.findOne({email:email})
        if(preuser){
            res.status(422).json({ error: "This Email already exist" })  
        }else {
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hashSync(password,salt)
            const newUser=new userdb ({username,email,password:hashedPassword})
            const savedUser=await newUser.save()
            res.status(200).json(savedUser)
    
        }
        
    }
    catch(err){
        res.status(500).json(err)
        console.log("catch block error");
    }

}

//login
const loginUser=async (req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "fill all the data" })
    }
    try{
        const user=await userdb.findOne({email:req.body.email})
       
        if(!user){
            return res.status(404).json("User not found!")
        }
        const match=await bcrypt.compare(req.body.password,user.password)
        
        if(!match){
            return res.status(401).json("Wrong credentials!")
        }
        const token=jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const {password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)

    }
    catch(err){
        res.status(500).json(err)
    }
}

//logout

const logoutUser=async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
}

//refetch user

const refetchUser=(req,res)=>{
    const token=req.cookies.token
    jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
}
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    refetchUser,
};