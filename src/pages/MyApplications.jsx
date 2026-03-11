import React, { useEffect, useState } from 'react';
import { application } from '../api/applicationApi';
import { Briefcase, MapPin, DollarSign, Calendar, ChevronRight, Search, Home, Bookmark, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const MyApplications = () => {
    
    const [Application, setApllication]=useState([])
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] =useState("All")



    useEffect(()=>{
         fetchApplications()
    },[])

    const fetchApplications =async()=>{
        try {
            const res= await application()
            setApllication(res.data.applications)
            console.log("my resposne",res.data.applications)

            
        } catch (error) {
            console.log(`error accours${error}`)
        } finally{
            setLoading(false)
        }
    }

    const getStatusStyle = (status) => {
        const base = "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ";
        switch (status.toLowerCase()) {
            case 'pending': return base + "bg-yellow-50 text-yellow-600 border-yellow-100";
            case 'accepted': return base + "bg-green-50 text-green-600 border-green-100";
            case 'rejected': return base + "bg-red-50 text-red-600 border-red-100";
            default: return base + "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#fafafb]">
            <div className="w-10 h-10 border-4 border-[#ffff22] border-t-transparent rounded-full animate-spin" />
        </div>
    );

    const filteredApplications = Application.filter(item=> item.jobId).filter(item=> 
       {
         if (activeTab === "All") return true;

         return item.status.toLowerCase() === activeTab.toLowerCase()
       }
    )


    
    return (

<div className="min-h-screen bg-[#fafafb] flex flex-col font-sans text-slate-900">
            {/* Header Section */}
            <header className="px-6 pt-6 md:pt-10 pb-4 sticky top-0 bg-[#fafafb]/80 backdrop-blur-md z-10 transition-all">
                <div className="flex items-center gap-2 text-[#ffff22] bg-black w-fit px-2 py-0.5 md:px-3 md:py-1 rounded-lg mb-2 md:mb-4">
                    <Briefcase size={14} className="md:w-4 md:h-4" />
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">Extraa Talent</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight">My Applications</h1>
                <p className="text-slate-400 text-xs md:text-sm font-medium mt-0.5 md:mt-1">Tracking {filteredApplications.length} job applications</p>
            </header>

            <main className="flex-1 px-6 space-y-6">
                {/* Status Tabs (Visual Only) */}
                <div className="flex gap-4 border-b border-slate-100 overflow-x-auto no-scrollbar">
                    {['All', 'Pending', 'Accepted', 'Rejected'].map((tab) => (
                        <button key={tab} 
                        onClick={()=>setActiveTab(tab)}
                        className={`pb-3 text-[11px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === tab ? 'text-black border-b-2 border-[#ffff22]' : 'text-slate-300 hover:text-slate-500 cursor-pointer'}`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Application Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredApplications
                        .filter(item => item.jobId)
                        .map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                            >
                                {/* Card Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {item.jobId.title}
                                        </h2>
                                        <p className="text-slate-500 font-bold uppercase tracking-wide text-xs">
                                            {item.jobId.company}
                                        </p>
                                    </div>
                                    <span className={getStatusStyle(item.status)}>
                                        {item.status}
                                    </span>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 gap-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                        <MapPin size={14} /> {item.jobId.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                        <DollarSign size={14} /> {item.jobId.salary}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                        <Briefcase size={14} /> {item.jobId.jobType}
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                        <Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {item.jobId.skillsRequired.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-tighter px-2.5 py-1 rounded-lg"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Footer */}
                                <div className="pt-5 border-t border-slate-50 flex justify-between items-center">
                                    <Link to={`/my-applications/${item._id}`}>
                                    <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors flex items-center gap-2 cursor-pointer">
                                        View Details <ChevronRight size={14} />
                                    </button>
                                    </Link>

                                    <div className="text-[10px] font-bold text-slate-300 uppercase">
                                        Applied on {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Empty State */}
                {Application.filter(item => item.jobId).length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-700">
                        <div className="bg-slate-100 p-8 rounded-full mb-6">
                            <Search size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">No applications found</h3>
                        <p className="text-slate-400 text-sm max-w-[200px]">Start your journey by applying to your dream jobs today!</p>
                    </div>
                )}
            </main>

            {/* Mobile Bottom Navigation */}
            {/* <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-4 flex justify-between items-center z-50">
                <button className="flex flex-col items-center gap-1 text-slate-300">
                    <Home size={24} />
                    <span className="text-[10px] font-black uppercase">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-300">
                    <Search size={24} />
                    <span className="text-[10px] font-black uppercase">Search</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-[#ffff22] bg-black p-3 rounded-full -mt-12 shadow-xl shadow-yellow-500/20">
                    <Briefcase size={28} />
                </button>
                <button className="flex flex-col items-center gap-1 text-black">
                    <Briefcase size={24} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase">Jobs</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-300">
                    <User size={24} />
                    <span className="text-[10px] font-black uppercase">Profile</span>
                </button>
            </div> */}

            <Footer/>
        </div>



    );
};

export default MyApplications;