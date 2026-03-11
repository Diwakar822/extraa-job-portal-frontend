import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Bookmark, Search, Bell, Home, User, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import Footer from './Footer';


const JobsList = () => {
    const [jobs, setjobs]=useState([])
    const [searchTerm, setSearchTerm]=useState("")
    const [isMenuOpen, setIsMenuOpen]=useState(false)
    const navigate=useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user');
        toast.success('User Logout Successfully')
        navigate('/login')
    }

    useEffect(()=>{
      const delay= setTimeout(() => {
         handleJobs(searchTerm)
      }, 1000);
      return ()=> clearTimeout(delay)
    },[searchTerm])

    const user= localStorage.getItem("user")
    const UserString= user ? JSON.parse(user) : null
    const userName=UserString?.name
    console.log(userName, 'username')
    

    const handleJobs=async(search="")=>{
       try {
         const res= await axios.get(`https://job-port-backend.onrender.com/api/jobs/jobs?search=${search}`)
         setjobs(res.data?.jobs)
         
        
       } catch (error) {
          console.log("Error Throwed:",error)

       }
    }

    console.log("Listed Jobs", jobs)
   
   
    return (
        <div className="min-h-screen bg-[#fafafb] flex flex-col font-sans text-slate-900">
            
            {/* 1. Header & Navigation */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#ffff22] rounded-lg flex items-center justify-center shadow-sm">
                        {/* <Briefcase size={18} className="text-black" /> */}
                        <img src="https://extraaimagesbucket.s3.ap-south-1.amazonaws.com/cropped-extraaLogo-1.png"/>
                    </div>
                    <span className="text-xl font-black tracking-tighter uppercase">Extraa</span>
                </div>
                
                <div className="flex items-center gap-4">
                    <button className="p-2 text-slate-400 bg-slate-50 rounded-full hover:text-black transition-colors"><Bell size={20} /></button>
                    <div className="w-9 h-9 bg-slate-200 rounded-full border-2 border-white overflow-hidden">
                        <button className='cursor-pointer' onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=ffff22&color=000`} alt="Profile" />
                        </button>

                        {isMenuOpen &&(
                            <>
                            <div className='fixed inset-0 z-10' onClick={()=>setIsMenuOpen(false)}></div>

                            <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                            <div className="px-4 py-2 border-b border-slate-50 mb-1">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Account</p>
                            <p className="text-sm font-bold truncate">{userName}</p>
                        </div>
                        <Link 
                            to="/my-applications" 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-black transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Briefcase size={16} />
                            My Applications
                        </Link>

                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-colors font-medium cursor-pointer"
                        >
                            <User size={16} />
                            Logout
                        </button>
                        </div>
                           
                           </>
                        )}
                    </div>
                </div>
            </nav>

            {/* 2. Main Content Container */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
                
                {/* Search & Hero Section */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Open Opportunities</h1>
                    <p className="text-slate-500 font-medium mb-8">Discover {jobs.length} new jobs tailored for you</p>
                    
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" size={20} />
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e)=>{setSearchTerm(e.target.value)}}
                            placeholder="Search by title or company..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#ffff22] shadow-sm transition-all"
                        />
                    </div>
                </div>

                {/* 3. Responsive Job Grid (1 col Mobile, 3 cols Desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((item) => (
                        <div key={item._id} className="group relative">
                            <Link to={`/jobs/${item._id}`} className="block h-full">
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:bg-[#ffff22]/10 transition-colors">
                                            <Briefcase size={28} className="text-slate-400 group-hover:text-black transition-colors" />
                                        </div>
                                        <button className="p-2 rounded-xl text-slate-300 hover:text-black hover:bg-slate-50 transition-all">
                                            <Bookmark size={20} />
                                        </button>
                                    </div>


                                    {/* Job Info */}
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-slate-600 font-semibold mb-4 uppercase">{item.company}</p>
                                        
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                <MapPin size={16} /> {item.location || "Remote"} | {item.jobType}

                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                <DollarSign size={16} /> {item.salary || "$100k - $120k"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Apply Button - Simulated */}
                                    <div className="pt-4 border-t border-slate-50">
                                        <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-2xl group-hover:bg-[#ffff22] group-hover:text-black transition-all active:scale-95 shadow-lg shadow-black/5 cursor-pointer">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {jobs.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-slate-100 p-6 rounded-full mb-4">
                            <Search size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No jobs found</h3>
                        <p className="text-slate-400">Try adjusting your search filters.</p>
                    </div>
                )}
            </main>

            {/* 4. Mobile Sticky Navigation */}
            {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 px-8 py-4 flex justify-between items-center z-50">
                <button className="flex flex-col items-center gap-1 text-[#ffff22]">
                    <Home size={24} fill="currentColor" />
                    <span className="text-[10px] font-black uppercase">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-black transition-colors">
                    <Search size={24} />
                    <span className="text-[10px] font-black uppercase">Search</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-black transition-colors">
                    <MessageSquare size={24} />
                    <span className="text-[10px] font-black uppercase">Messages</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-slate-300 hover:text-black transition-colors">
                    <User size={24} />
                    <span className="text-[10px] font-black uppercase">Profile</span>
                </button>
            </div> */}

            <Footer/>
        </div>

    );
};

export default JobsList;