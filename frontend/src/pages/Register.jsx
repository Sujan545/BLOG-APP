import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import {URL} from '../url'


const Register = () => {
const [formData, setFormData]=useState({
  username:'',
  email:'',
  password:''
});
const [error, setError]=useState({
  username:'',
  email:'',
  password:''
});

const handleChange =(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
}
  const [passShow,setPassShow]=useState(false)
 
 // const [error,setError]=useState(false)
  const navigate=useNavigate()

  const handleRegister=async (e)=>{
    e.preventDefault();
    const { username, email, password } = formData;
    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = 'Username is required.';
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Invalid email address.';
    }

    if (!password.trim()) {
      formErrors.password = 'Password is required.';
    }

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
    
    try{
      const res=await axios.post(URL+"/api/auth/register",formData)
     console.log(res.data)
      setError({})
      navigate("/login")
      
    }
    catch(err){
      console.error(error);
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: 'Registration failed. Please try again.' });
      }
    }

  }

  

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/"> Blog </Link></h1>
    <h3><Link to="/login">Login</Link></h3>
    </div>
    <form onSubmit={handleRegister}>
    <div className="w-full flex justify-center items-center h-[85vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Create an account</h1>
         <input type="text" className="w-full px-4 py-2 border-2 border-black outline-0" id="username" name="username"  value={formData.username} onChange={handleChange} required placeholder="Enter your username"/>
         {error.username && <p className="text-red-500 text-sm">{error.username}</p>}
         <input type="text" className="w-full px-4 py-2 border-2 border-black outline-0" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
         {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
         
         <input type={!passShow ? "password" : "text"} id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 border-2 border-black outline-0"    placeholder='Enter Your Password' />
         {error.password && <p className="error-message">{error.password}</p>}
         <button type="submit" className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
         {/* {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>} */}
         {error.general && <p className="text-red-500 text-sm">{error.general}</p>}
         <div className="flex justify-center items-center space-x-3">
          <p>Already have an account?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
         </div>
       </div>
    </div>
    </form>
  
    <Footer/>
    </>
    
  )
}

export default Register