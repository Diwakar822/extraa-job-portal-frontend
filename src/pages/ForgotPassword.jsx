import React, { useState } from 'react';
import { Forgotpassword } from '../api/authApi';
import { toast } from 'react-toastify';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';

const ForgotPassword = () => {

    const [email, setEmail]=useState("")
    const [loading, setloading]=useState(false)


    const handleSubmit=async(e)=>{
        e.preventDefault();
          setloading(true)
        try {
            await Forgotpassword({email})
           
            toast.success(`Reset link sent to your email ${email}`)
        } catch (error) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        toast.error(errorMessage);
        console.error("Full Error:", error);
            
        }finally{
            setloading(false)
        }
    }
    return (
        <div className="min-h-screen bg-[#fafafb] flex flex-col items-center justify-center px-6 font-sans text-slate-900">

        <div className="mb-10 text-center"> <div className="w-20 h-20 bg-[#ffff22] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-yellow-500/20"> <RefreshCw size={32} className="text-black" /> 
</div>

        <h1 className="text-3xl font-black tracking-tight mb-2">Forgot Password?</h1>
        <p className="text-slate-400 font-medium max-w-xs mx-auto"> Enter your email address and we'll send you a link to reset your password. </p>



           <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-1.5"> 
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label> 
            
            <div className="relative group mt-10"> <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-black transition-colors " size={20} /> 

            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#ffff22] shadow-sm transition-all font-bold text-slate-900 " required />
  
             </div> 
             </div>

             <button type="submit" disabled={loading} className=" cursor-pointer w-full bg-[#ffff22] hover:bg-[#eaea1f] text-black font-black py-4 rounded-2xl shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50" > {loading ? ( <> <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> SENDING... </> ) : ( "Send Reset Link" )} </button>


           </form>

           {/* Back to Login */} 
           
          <center> <button onClick={() => window.history.back()} className="mt-8 flex items-center gap-2 text-slate-400 hover:text-black font-bold transition-colors group cursor-pointer" > <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Login </button></center> </div>



            
        </div>
    );
};

export default ForgotPassword;