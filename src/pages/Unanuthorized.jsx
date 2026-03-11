import { ArrowLeft, Home, Lock, ShieldAlert } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unanuthorized = () => {
 
    const navigate =useNavigate();

    return (
        
<div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] px-6 overflow-hidden"> 
{/* Background Subtle Tech Animation (Scanning Line) */}
<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
 <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-[scan_3s_linear_infinite]" /> 
 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent" /> 
</div> 

{/* Main Content Card */} 
<div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">

{/* Animated Icon Container */} 
<div className="relative mb-8 group"> <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
 <div className="relative w-32 h-32 bg-gradient-to-b from-zinc-800 to-zinc-900 border border-white/10 rounded-full flex items-center justify-center shadow-2xl"> 
 <Lock size={48} className="text-red-500 transition-transform group-hover:scale-110 duration-500" /> 

{/* Orbiting Ring */} 
<div className="absolute inset-0 border-2 border-dashed border-red-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
</div>
</div>

 {/* Error Text */} 
<div className="space-y-3 mb-12"> 
    <h1 className="text-4xl font-black text-white tracking-tight uppercase">
Access
<span className="text-red-500">Denied</span> 
</h1> <p className="text-zinc-400 text-lg"> You don't have permission to access this area. Please verify your credentials or contact an administrator. </p>
<div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-600 bg-zinc-900/50 py-1 px-3 rounded-full mx-auto w-fit">
<ShieldAlert size={14} /> ERROR_CODE: 403_UNAUTHORIZED 
</div> 
</div> 

{/* Action Buttons */} 
<div className="flex flex-col w-full gap-4">
     <button onClick={() => navigate('/')} className="w-full bg-[#ffff22] hover:bg-[#e6e600] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(255,255,34,0.15)] transition-all active:scale-95 cursor-pointer" > 
     <Home size={20} /> Return to Home 
     </button>

<button onClick={() => navigate('/login')} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer " > 
<ArrowLeft size={18} /> Back to Login 
</button>

</div> 
</div>

{/* Footer Brand */}
<div className="absolute bottom-11 text-zinc-700 text-xs font-bold tracking-widest uppercase"> 
    Extraa Technologies • Security System </div>
<style jsx>
    {` @keyframes scan { 0% { transform: translateY(-100vh); } 100% { transform: translateY(100vh); } } `}
</style> 

</div>
        
    );
};

export default Unanuthorized;