import React, { useState } from 'react';
import { createJob } from '../api/jobApi';
import { Briefcase, Building2, MapPin, DollarSign, FileText, Sparkles, PlusCircle, AlertCircle } from 'lucide-react';
import JobCreatedSuccessModel from '../components/JobCreatedSuccessModel';
import { toast } from 'react-toastify';


const InputField = ({ label, icon: Icon, ...props }) => (
        <div className="space-y-1.5 mb-5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                {label}
            </label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors">
                    <Icon size={18} />
                </div>
                <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white shadow-sm transition-all text-sm font-bold text-slate-900 placeholder:text-slate-300"
                    {...props}
                />
            </div>
        </div>
);

const CreateJob = () => {

    const [form, setFrom]= useState({
        title:"",
        company:"",
        location:"",
        jobType:"",
        salary:"",
        description:"",
        skillsRequired:"",
    })
    const [Message, setmessage]=useState('')
    const [loading, setLoading]= useState(false);
    const [showSuccess, setshowSuccess]=useState(false);
    const [jobtitle, setJobtitle]= useState('')
    const handleChange=(e)=>{
       
        // setFrom({...form, [e.target.name]: e.target.value})
        setFrom(prev=>({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    console.log("form data:", form)

    const handleSubmit=async (e)=>{
        e.preventDefault()

        const formData= new FormData()
        Object.keys(form).forEach((key)=>{
             formData.append(key, form[key])
        })

        for(let [key, value] of formData.entries()){
            console.log(key, value)
        }

        try {
            const jobData ={
                ...form,
                 skillsRequired: form.skillsRequired.split(',').map(skill=> skill.trim())
            }
            const res= await createJob(jobData)

            setmessage(res?.data?.message)
            setshowSuccess(true)
            toast.success('Job Created Successfully')
            setJobtitle(res?.data?.job?.title)
            console.log(res?.data?.message)
            
        } catch (error) {
            toast.error('Failed to create job. Please try again.')
             console.error('error accours:', error)
             setmessage('Failed to create job. Please try again.')
        } finally{
            setLoading(false)
        }
    }

    const handleCloseModal=()=>{
        setshowSuccess(false)
        setFrom({
            title:"",
            company:"",
            location:"",
            jobType:"",
            salary:"",
            description:"",
            skillsRequired:"",
         })
    }

    


    return (
        <div className="min-h-screen bg-[#fafafb] p-4 md:p-8 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                {/* Brand Header */}
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className="bg-black p-2.5 rounded-xl shadow-lg">
                        <PlusCircle size={24} className="text-[#ffff22]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                            Create<span className="text-slate-400">Position</span>
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Admin Dashboard</p>
                    </div>
                </div>
        <div>

            {/* Form Card */}
                <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <header className="mb-8">
                        <div className="flex items-center gap-2 text-[#ffff22] bg-black w-fit px-3 py-1 rounded-lg mb-3">
                            <Sparkles size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">New Listing</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Post a New Job</h2>
                        <p className="text-slate-400 text-sm font-medium mt-1">Fill in the professional requirements for the role.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-1">
                        <InputField label="Job Title" name="title" value={form.title} icon={Briefcase} placeholder="e.g. Senior UI Designer" onChange={handleChange} required />
                        <InputField label="Company Name" name="company" value={form.company} icon={Building2} placeholder="e.g. Extraa Technologies" onChange={handleChange} required />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
                            <InputField label="Location" name="location" value={form.location} icon={MapPin} placeholder="e.g. London, UK / Remote" onChange={handleChange} required />
                            <div className="space-y-1.5 mb-5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Type</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black pointer-events-none">
                                        <Briefcase size={18} />
                                    </div>
                                    <select 
                                        name='jobType' 
                                        value={form.jobType}
                                        onChange={handleChange} 
                                        required
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-10 outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white shadow-sm transition-all text-sm font-bold text-slate-900 appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Full-Time">Full Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <InputField label="Salary Range" name="salary" value={form.salary} icon={DollarSign} placeholder="e.g. $120k - $150k" onChange={handleChange} required />

                        <div className="space-y-1.5 mb-5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Job Description</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-black">
                                    <FileText size={18} />
                                </div>
                                <textarea
                                    name='description'
                                    value={form.description}
                                    placeholder='Describe the role, responsibilities, and qualifications...'
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 min-h-[140px] outline-none focus:ring-2 focus:ring-[#ffff22] focus:bg-white shadow-sm transition-all text-sm font-medium text-slate-900 placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <InputField label="Required Skills" name="skillsRequired" value={form.skillsRequired} icon={Sparkles} placeholder="e.g. React, Node.js, Tailwind CSS (comma separated)" onChange={handleChange} required />

                        {/* {Message && (
                            <div className={`p-4 rounded-2xl flex items-center gap-3 mb-6 animate-in fade-in zoom-in duration-300 ${Message.toLowerCase().includes('success') ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                <AlertCircle size={18} />
                                <p className="text-xs font-black uppercase tracking-wider">{Message}</p>
                            </div>
                        )} */}

                        <div className="pt-4 flex flex-col gap-3">
                            <button 
                                type='submit' 
                                disabled={loading}
                                className="w-full bg-[#ffff22] cursor-pointer hover:bg-[#eaea1f] text-black font-black py-5 rounded-2xl shadow-xl shadow-yellow-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {loading ? 'PROCESSING...' : 'CREATE JOB POSITION'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
         <JobCreatedSuccessModel
            isvisible={showSuccess}
            jobtitle={jobtitle}
            onclosed={handleCloseModal}
         />
        </div>

    );
};

export default CreateJob;   