import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { data, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Calendar, Share2, Bookmark, CheckCircle2 } from 'lucide-react';


const JobDetails = () => {
     const { id } = useParams();
     const [jobs, setjob] = useState([]);
     const navigate = useNavigate();
     const [loading, setloading] = useState(true);

    useEffect(() => {
    fetchJob();
  }, []);

     const fetchJob = async () => {
    try {
      const res = await axios.get(`https://job-port-backend.onrender.com/api/jobs/jobs/${id}`);
      setjob(res.data.jobs);
      console.log(res.data)
    } catch (error) {
      console.log("Error fetching job:", error);
    } finally {
      setloading(false);
    }
  };

  if(loading)
    return(
          <div className="min-h-screen flex items-center justify-center bg-[#fafafb]">
            <div className="w-10 h-10 border-4 border-[#ffff22] border-t-transparent rounded-full animate-spin" />
        </div>
  )

  if(!jobs) return(
     <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <button onClick={() => navigate(-1)} className="text-blue-600 font-bold underline">Go Back</button>
        </div>
  )
  


    return (

    <div className="min-h-screen bg-[#fbfafa] pb-24 md:pb-32 font-sans text-slate-900">
            {/* 1. Header Navigation - Reduced padding on mobile */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-6 py-3 flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={20} className="md:w-6 md:h-6 cursor-pointer" />
                </button>
                <div className="flex gap-1">
                    <button className="p-2 text-slate-400 hover:text-black transition-colors"><Share2 size={20} /></button>
                    <button className="p-2 text-slate-400 hover:text-black transition-colors"><Bookmark size={20} /></button>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 md:px-6 pt-6 md:pt-8">
                {/* 2. Hero Section - Adjusted font sizes */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 text-[#ffff22] rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl font-black mb-4 shadow-xl shadow-black/10 uppercase">
                        {jobs.company.charAt(0)}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black mb-1 tracking-tight">{jobs.title}</h1>
                    <p className="text-blue-600 font-bold text-sm md:text-lg mb-6 uppercase tracking-wide">{jobs.company}</p>
                    
                    {/* Detail Badges Row - Smaller gap and padding for mobile */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl shadow-sm">
                            <MapPin size={14} className="text-slate-400" />
                            <span className="text-xs md:text-sm font-bold text-slate-600">{jobs.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl shadow-sm">
                            <DollarSign size={14} className="text-slate-400" />
                            <span className="text-xs md:text-sm font-bold text-slate-600">{jobs.salary}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white border border-slate-100 px-3 py-1.5 md:px-4 md:py-2.5 rounded-xl md:rounded-2xl shadow-sm">
                            <Briefcase size={14} className="text-slate-400" />
                            <span className="text-xs md:text-sm font-bold text-slate-600">{jobs.jobType}</span>
                        </div>
                    </div>
                </div>

                {/* 3. Detailed Sections Card - Modified corners and padding */}
                <div className="bg-white rounded-2xl md:rounded-[32px] p-5 md:p-8 border border-slate-100 shadow-sm space-y-8">
                    {/* Description Section */}
                    <section>
                        <h2 className="text-lg md:text-xl font-black mb-3 flex items-center gap-2">Job Description</h2>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            {jobs.description}
                        </p>
                    </section>

                    {/* Requirements Section */}
                    <section>
                        <h2 className="text-lg md:text-xl font-black mb-3 flex items-center gap-2">Skills Required</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                            {jobs.skillsRequired?.map((skill, index) => (
                                <div key={index} className="flex items-center gap-3 bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 group hover:border-[#ffff22] transition-colors">
                                    <CheckCircle2 size={16} className="text-[#ffff22]" />
                                    <span className="font-bold text-sm md:text-base text-slate-700">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Post Date Section */}
                    <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-400 text-xs font-medium">
                        <Calendar size={14} />
                        Posted: {new Date(jobs.createdAt).toLocaleDateString()}
                    </div>
                </div>
            </main>

            {/* 4. Sticky Mobile Footer Action - More compact for mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 p-4 md:p-6 z-50">
                <div className="max-w-3xl mx-auto flex gap-3 md:gap-4">
                    <button className="flex-1 bg-slate-900 text-white font-black py-3 md:py-4 rounded-xl md:rounded-2xl transition-all active:scale-95 text-sm md:text-base text-center cursor-pointer">
                        Contact
                    </button>
                    <button 
                        className="flex-[2] bg-[#ffff22] hover:bg-[#eaea1f] text-black font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg shadow-yellow-500/10 transition-all active:scale-95 text-sm md:text-base text-center cursor-pointer"
                        onClick={() => navigate(`/apply/${jobs._id}`, { state: { jobTitle: jobs.title } })}
                    >
                        Apply Now
                    </button>
                </div>
            </div>
        </div>


    );
};

export default JobDetails;