import React from 'react';
import { CheckCircle2, ArrowRight, Home, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobApplicationSuccessModel = ({isvisible}) => {
    const navigate=useNavigate()

     if (!isvisible) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            {/* Backdrop with heavy blur */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                // onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative bg-white rounded-[40px] p-8 w-full max-w-sm shadow-2xl border border-slate-100 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                
                {/* Celebratory Icon */}
                <div className="flex justify-center -mt-20 mb-6">
                    <div className="relative">
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 bg-green-400/30 blur-2xl rounded-full animate-pulse scale-150" />
                        <div className="relative bg-white rounded-full p-1 shadow-xl">
                            <div className="bg-green-500 rounded-full p-5 shadow-inner">
                                <CheckCircle2 size={48} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3 mb-10">
                    <h2 className="text-2xl font-black text-slate-900 leading-tight">
                        Application Sent!
                    </h2>
                    <p className="text-slate-500 font-medium px-4">
                        {/* Your profile was successfully submitted for the <span className="text-blue-600 font-bold">{jobTitle}</span> role at <span className="text-slate-900 font-bold">{company}</span>. */}
                    </p>
                </div>

                {/* Stats/Info Section */}
                <div className="bg-slate-50 rounded-3xl p-4 mb-8 flex justify-around items-center border border-slate-100">
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-sm font-black text-green-600">Pending</p>
                    </div>
                    <div className="h-8 w-[1px] bg-slate-200" />
                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                        <p className="text-sm font-black text-slate-900">Just now</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button 
                        onClick={()=>{navigate('/jobs')}}
                        className="w-full bg-[#ffff22] hover:bg-[#eaea1f] text-black font-black py-4 rounded-2xl shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2 transition-all active:scale-95 group"
                    >
                        Keep Browsing
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                        onClick={()=>navigate('/my-applications')}
                        className="w-full bg-slate-50 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                        <Briefcase size={18} />
                        View My Applications
                    </button>
                </div>
            </div>
        </div>

    );
};

export default JobApplicationSuccessModel;