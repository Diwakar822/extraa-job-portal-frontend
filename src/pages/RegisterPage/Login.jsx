import React, { use, useState } from 'react';
import { validateLogin } from '../../utils/validate';
import { loginUser } from '../../api/authApi';
import { Mail, Eye, EyeOff, UserPlus, ArrowLeft, LogIn } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import SuccessModal from '../SuccessModal';

const Login = () => {

    const[form, setform]=useState({
        email: "",
        password: ""
        
    })
    const [message, setmessage]=useState('')
    const [email, setmail] =useState('')
    const [errors,seterrors]=useState({})
    const [showSuccess, setshowSuccess]=useState(false)
    const[showPassword, setShowPassword]=useState(false)
    const navigate= useNavigate()

    const handleChange=(e)=>{
         setform({...form, [e.target.name]: e.target.value })
    }


    const handleSubmit=async(e)=>{
        e.preventDefault();
       const validationErrors=validateLogin(form) 
        if(Object.keys(validationErrors).length > 0){
             return seterrors(validationErrors)
        }

        try {
            const res= await loginUser(form)

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user))

                setmessage(res.data.message)
                setmail(res.data?.user?.name)
                setshowSuccess(true);
                seterrors({})

          setTimeout(() => {

              if(res.data.user.role === "admin"){
             
               navigate("/admin")
            }else{
              
                navigate("/jobs")
             
            }
            
          }, 3000);
            
            
        } catch (error) {
          navigate('/Unauthorized')
            console.log("errors:", error)
            seterrors(error.response?.data?.message || "something Went Worng")
            
        }


    }


    return (
         <div className="min-h-screen bg-[#fafaf5] flex flex-col items-center px-6 py-12 text-slate-900">

      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-8">
        <button className="p-2 hover:bg-slate-100 rounded-full cursor-pointer">
          <ArrowLeft size={24} onClick={()=>{navigate(-1)}} />
        </button>
        <h1 className="text-lg font-semibold">Login</h1>
        <div className="w-10" />
      </div>

      {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-[#ffff22] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(255,255,34,0.4)]">
          {/* <span className="text-4xl">⚡</span> */}
          <img src='https://extraaimagesbucket.s3.ap-south-1.amazonaws.com/cropped-extraaLogo-1.png' />
        </div>
      </div>

      {/* Text */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Welcome Back To Extraa</h2>
        <p className="text-slate-500">
          Sign in to continue yours journey
        </p>
      </div>

      {/* Message */}
      {message && (
        <p className="mb-4 text-green-600 font-semibold">
          {message}
        </p>
      )}

      {/* Register Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6"
      >
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 pr-12 outline-none focus:ring-2 focus:ring-[#ffff22]"
            />
            <Mail
              size={20}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm font-bold ml-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 pr-12 outline-none focus:ring-2 focus:ring-[#ffff22]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* API Error */}
        {errors.api && (
          <p className="text-sm text-red-600 font-medium">
            {errors.api}
          </p>
        )}

        <button 
        type='submit' 
         className="w-full bg-[#ffff22] hover:bg-[#f0f000] text-black font-bold py-4 rounded-3xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,255,34,0.3)] transition-all active:scale-[0.98] cursor-pointer"> 
        Log In <LogIn size={20} />
        </button>

        <Link to='/forgot-password'>
        <button 
         className="w-full bg-[#ffff22] hover:bg-[#f0f000] text-black font-bold py-4 rounded-3xl flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,255,34,0.3)] transition-all active:scale-[0.98] cursor-pointer"> 
         Forgot Password<LogIn size={20} />
        </button>
        </Link>
      </form>

      {/* Footer */}
      <p className="text-[10px] text-center text-slate-400 max-w-xs mt-8">
        By registering you agree to our{" "}
        <a href='https://extraa.in/terms/' target='_blank'><span className="underline font-medium cursor-pointer">
          Terms of Service
        </span></a>{" "}
        and{" "}
        <a href='https://extraa.in/privacy/' target='_blank' ><span className="underline font-medium cursor-pointer">
          Privacy Policy
        </span>.</a>
      </p>
       <SuccessModal
        message={message}
        isvisible={showSuccess}
        name={email}
       />
    </div>

    );
};

export default Login;