import { CheckCircle, Eye, LayoutDashboard } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCreatedSuccessModel = ({isvisible, jobtitle, onclosed}) => {
    const navigate=useNavigate()
    if(!isvisible){
        return null
    }
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Backdrop with Backdrop Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onclosed}
      />

      {/* Modal Card */}
      <div className="relative bg-[#0F0F0F] rounded-[40px] p-8 w-full max-w-sm shadow-2xl border border-white/10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Animated Icon Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Glowing Aura */}
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
            
            {/* Main Icon Circle */}
            <div className="relative bg-zinc-900 rounded-full p-1 shadow-2xl border border-white/5">
              <div className="bg-green-500 rounded-full p-5 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                <CheckCircle size={48} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-black text-white leading-tight uppercase tracking-tight">
            Job Posted <br />
            <span className="text-[#ffff22]">Successfully!</span>
          </h2>
          <p className="text-zinc-400 font-medium px-4 text-sm leading-relaxed">
            Your listing for <span className="text-white font-bold">{jobtitle || "the position"}</span> is now live and visible to top-tier candidates on the Extraa portal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* <button
          onClick={()=>navigate('admin/jobs')}
            className="w-full bg-[#ffff22] hover:bg-[#eaea1f] text-black font-black py-4 rounded-2xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-3 transition-all active:scale-95 group"
          >
            View Listing
            <Eye size={20} className="group-hover:scale-110 transition-transform" />
          </button> */}
          
          <button 
          onClick={onclosed}
            className="w-full bg-white/5 text-zinc-400 font-bold py-4 rounded-2xl hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-3"
          >
            <LayoutDashboard size={20} />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>

    );
};

export default JobCreatedSuccessModel;