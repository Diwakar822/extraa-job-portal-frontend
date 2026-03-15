import axios from 'axios';
import { Bookmark, BookMarked, Building2, ChevronRight, MapPin, Loader2, ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { toast } from 'react-toastify';


const SavedJobs = () => {

    const [saveJob, SetsaveJob]=useState([])
    const [loading, setLoading] = useState(true);

    const navigate= useNavigate()

    const getsavedjob= async()=>{

        setLoading(true)

        try {
             const token= localStorage.getItem("token")
             const res =await axios.get('http://localhost:5000/api/jobs/saved',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        SetsaveJob(res.data);
        console.log(res.data)
            
        } catch (error) {
            console.error(error)
            
        }finally{
            setLoading(false)
        }

       
    }

    useEffect(()=>{
         getsavedjob()
    },[])


    const deleteJob= async(jobId)=>{


        try {

            const token=localStorage.getItem("token")
            
            await axios.delete(`http://localhost:5000/api/jobs/unsave/${jobId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            SetsaveJob((prevJobs)=>prevJobs.filter((item)=>item.jobId._id !== jobId))
            toast.success('Job Removed Successfully')
        } catch (error) {
            console.error(error)
            toast.error('Somthing Went Worng')
        }

    }

    if(loading)
    return(
          <div className="min-h-screen flex items-center justify-center bg-[#fafafb]">
            <div className="w-10 h-10 border-4 border-[#ffff22] border-t-transparent rounded-full animate-spin" />
        </div>
  )

    

    return (
        <div className='min-h-screen bg-[#fafafb] flex flex-col font-sans text-slate-900'>

            <header className='px-6 py-6 sticky top-0 bg-[#fafafb]/90 backdrop-blur-md z-20 border-b border-slate-100'>
            <div className='max-w-7xl mx-auto flex items-center gap-4'>
            <button onClick={()=>navigate(-1)} className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl transition-all cursor-pointer">
                        <ChevronRight size={20} />
            </button>
            </div>
            <h1 className='text-2xl font-black tracking-tight'>Saved Jobs</h1>
            <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>{saveJob.length} Opportunities Saved</p>
            </header>

           <main className='flex-1 w-full max-w-7xl mx-auto px-6 py-8'>
            {loading ? (
                    /* Loading State */
                    <div className='flex flex-col items-center justify-center py-20'>
                        <Loader2 className="animate-spin text-slate-300" size={40} />
                    </div>
                ) : saveJob.length > 0 ? (
                    /* Grid Layout: 1 col mobile, 2 col tablet, 3 col desktop */
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {saveJob.map((item) => (
                            <div 
                                key={item.jobId._id}
                                className='bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-yellow-500/5 hover:-translate-y-1 transition-all group relative overflow-hidden'
                            >
                                <div className='flex justify-between items-start mb-6'>
                                    <div className='w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-yellow-200 transition-colors'>
                                        <Building2 size={28} className="text-slate-400 group-hover:text-black transition-colors" />
                                    </div>

                                    <button className='p-2.5 cursor-pointer rounded-xl shadow-lg transition-all active:scale-90 bg-black text-[#ffff22] hover:bg-red-50 hover:text-red-500 hover:shadow-red-500/10 group/bookmark'
                                    onClick={()=>deleteJob(item.jobId._id)}
                                    title='Remove from saved'
                                    >
                                        <Bookmark size={20} fill='currentColor' className='transition-colors ' />
                                    </button>
                                </div>

                                <div className='mb-8'>
                                    <h3 className='text-xl font-black text-slate-900 mb-2 leading-tight'>
                                        {item.jobId.title}
                                    </h3>
                                    <div className='flex flex-wrap items-center gap-3'>
                                        <span className='px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600'>
                                            {item.jobId.company}
                                        </span>
                                        <div className='flex items-center gap-1 text-sm font-medium text-slate-400'>
                                            <MapPin size={14} />
                                            {item.jobId.location}
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate(`/jobs/${item.jobId._id}`)}
                                    className='w-full cursor-pointer bg-[#ffff22] hover:bg-black hover:text-white text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group/btn'
                                >
                                    View Details
                                    <ChevronLeft size={18} className="rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className='flex flex-col items-center justify-center py-32 text-center'>
                        <div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6'>
                            <Bookmark size={32} className='text-slate-300'/>
                        </div>
                        <h2 className='text-xl font-black mb-2'>No saved jobs yet</h2>
                        <p className='text-slate-400 max-w-xs mx-auto font-medium'>
                            Explore new opportunities and save them to keep track of your applications.
                        </p>
                        <button 
                            onClick={() => navigate('/jobs')}
                            className='mt-8 cursor-pointer px-8 py-3 bg-black text-white font-black rounded-2xl hover:bg-slate-800 transition-all'
                        >
                            Find Jobs
                        </button>
                    </div>
                )}

           </main>

           <Footer/>
        </div>
    );
};

export default SavedJobs;