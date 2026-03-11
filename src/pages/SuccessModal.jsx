import { ArrowRight, CheckCircle2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SuccessModal = ({message, isvisible,name}) => {
    const[show, setshow]=useState(false)

    useEffect(()=>{
      setshow(isvisible)
    },[isvisible])

    if(!isvisible) return null
    return (
        <div>
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>

      {/* Modal Card */}
      <div className={`relative bg-zinc-900/90 border border-white/10 w-full max-w-sm rounded-[32px] p-8 shadow-2xl transition-all duration-500 transform ${show ? 'scale-100 translate-y-0' : 'scale-90 translate-y-10'}`}>
        
        {/* Success Icon Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-green-500 rounded-full p-4 shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-[bounce_2s_infinite]">
              <CheckCircle2 size={40} className="text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-black text-white">Login Successful!</h2>
          <p className="text-zinc-400 font-medium">
            {"Welcome back to the Extraa Technologies family."} {name}
          </p>
        </div>

        {/* Action Button */}
        {/* <button 
          className="w-full bg-[#ffff22] hover:bg-[#e6e600] text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 group transition-all active:scale-95 shadow-lg shadow-yellow-500/10"
        >
          Continue to Dashboard
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button> */}
      </div>
    </div>
        </div>
    );
};

export default SuccessModal;