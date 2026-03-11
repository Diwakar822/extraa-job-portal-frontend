import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Lock, Eye, EyeOff, ShieldCheck, ArrowRight, ArrowLeft} from 'lucide-react'

const ResetPassword = () => {

    const {token}=useParams();
    const navigate=useNavigate()
    const[newpassword, setNewpassword]=useState("")
    const [showPassword, setShowPassword]=useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true)

        try {

            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`,
                {newPassword: newpassword})
            toast.success('Password has been changed Now')

            setTimeout(() => {
                  navigate("/login")
            }, 2000);
          
            
        } catch (error) {
            toast.error(error.data.message)
            console.log('Error accours:', error)
        }finally{
            setLoading(false)
        }

    }
    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-6 py-12 font-sans text-slate-900">

        <div className="w-full max-w-md mb-6 md:absolute md:top-8 md:left-6">
                <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-black transition-colors font-bold text-xs sm:text-sm uppercase tracking-widest">
                    <ArrowLeft size={18} /> Back to Login
                </Link>
            </div>

             <div className="mb-6 sm:mb-10 relative">
                <div className="absolute inset-0 bg-[#ffff22] blur-3xl opacity-20 rounded-full animate-pulse"/>
                <div className="relative bg-white p-4 sm:p-6 rounded-[24px] sm:rounded-[32px] shadow-xl border border-slate-50">
                    <ShieldCheck size={48} className="sm:w-12 sm:h-12 text-[#ffff22] fill-black" />
                </div>
            </div>  

             <div className="w-full max-w-md bg-white rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-50">
                <div className="text-center mb-8 sm:mb-10">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 uppercase">New Password</h1>
                    <p className="text-sm sm:text-base text-slate-400 font-medium">Please enter a strong new password to secure your account.</p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-[#000000] uppercase tracking-[2px] ml-1">
                            New Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors" size={20}/>

                    <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    value={newpassword}
                    onChange={(e)=>setNewpassword(e.target.value)}
                    className="w-full bg-[#F3F4F6] border-none rounded-2xl py-4 pl-12 sm:pl-14 pr-12 sm:pr-14 outline-none focus:ring-2 focus:ring-[#ffff22] transition-all font-bold text-slate-900 text-sm sm:text-base"
                    required
                    />

                    <button type='button'
                    onClick={()=>setShowPassword(!showPassword)}
                    className='absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-black transition-colors cursor-pointer'>
                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
                    </div>
                    </div>

                    <button type='submit'
                    disabled={loading}
                    className='w-full bg-[#ffff22] hover:bg-black hover:text-white text-black font-black py-4 sm:py-5 rounded-2xl shadow-xl shadow-yellow-500/10 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer'
                    > {loading ? 'PROCESSING....' : (<>
                    <span className='uppercase tracking-[1px] sm:tracking-[2px] text-sm sm:text-base'>
                      Reset Password
                    </span>
                    <ArrowRight size={20}/>
                    
                    </>)}

                    </button>
                    
                </form>       
        </div>

        <div className="mt-8 sm:mt-12 text-[8px] sm:text-[10px] text-center font-black text-slate-300 uppercase tracking-[2px] sm:tracking-[3px]">
                Extraa Technologies • Security Suite
            </div>
        </div>

    );
};

export default ResetPassword;